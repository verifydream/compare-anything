import { DiffLine } from '../types';

export interface DiffResult {
  leftLines: DiffLine[];
  rightLines: DiffLine[];
  stats: {
    added: number;
    removed: number;
    modified: number;
  };
}

/**
 * Computes a side-by-side aligned line-level diff between original and modified text.
 */
export function computeDiff(
  original: string,
  modified: string,
  options: { ignoreWhitespace: boolean; caseInsensitive: boolean }
): DiffResult {
  const leftRaw = original.split(/\r?\n/);
  const rightRaw = modified.split(/\r?\n/);

  const normalize = (line: string): string => {
    let result = line;
    if (options.ignoreWhitespace) {
      result = result.replace(/\s+/g, '');
    }
    if (options.caseInsensitive) {
      result = result.toLowerCase();
    }
    return result;
  };

  const leftNorm = leftRaw.map(normalize);
  const rightNorm = rightRaw.map(normalize);

  const N = leftNorm.length;
  const M = rightNorm.length;

  // DP table for LCS
  const dp: number[][] = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= M; j++) {
      if (leftNorm[i - 1] === rightNorm[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to find aligned operations
  let i = N;
  let j = M;
  const actions: Array<{ type: 'match' | 'delete' | 'add'; lIdx: number; rIdx: number }> = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && leftNorm[i - 1] === rightNorm[j - 1]) {
      actions.push({ type: 'match', lIdx: i - 1, rIdx: j - 1 });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      actions.push({ type: 'add', lIdx: -1, rIdx: j - 1 });
      j--;
    } else {
      actions.push({ type: 'delete', lIdx: i - 1, rIdx: -1 });
      i--;
    }
  }

  actions.reverse();

  const leftLines: DiffLine[] = [];
  const rightLines: DiffLine[] = [];

  let addedCount = 0;
  let removedCount = 0;
  let modifiedCount = 0;

  // Align corresponding additions and deletions to show them as "modified" or adjacent
  // We can group pairs of consecutive delete/add actions as a modification block if they have similar location
  let idx = 0;
  while (idx < actions.length) {
    const act = actions[idx];

    if (act.type === 'match') {
      leftLines.push({
        type: 'normal',
        lineNumberLeft: act.lIdx + 1,
        lineNumberRight: act.rIdx + 1,
        content: leftRaw[act.lIdx],
      });
      rightLines.push({
        type: 'normal',
        lineNumberLeft: act.lIdx + 1,
        lineNumberRight: act.rIdx + 1,
        content: rightRaw[act.rIdx],
      });
      idx++;
    } else if (act.type === 'delete') {
      // Look ahead: is the next one an 'add' action? If so, treat them as modified/aligned.
      if (idx + 1 < actions.length && actions[idx + 1].type === 'add') {
        const addAct = actions[idx + 1];
        leftLines.push({
          type: 'deletion',
          lineNumberLeft: act.lIdx + 1,
          content: leftRaw[act.lIdx],
        });
        rightLines.push({
          type: 'addition',
          lineNumberRight: addAct.rIdx + 1,
          content: rightRaw[addAct.rIdx],
        });
        modifiedCount++;
        idx += 2;
      } else {
        leftLines.push({
          type: 'deletion',
          lineNumberLeft: act.lIdx + 1,
          content: leftRaw[act.lIdx],
        });
        rightLines.push({
          type: 'spacer',
          content: '',
        });
        removedCount++;
        idx++;
      }
    } else if (act.type === 'add') {
      // Look back is not needed as we process sequentially and pair delete-add.
      leftLines.push({
        type: 'spacer',
        content: '',
      });
      rightLines.push({
        type: 'addition',
        lineNumberRight: act.rIdx + 1,
        content: rightRaw[act.rIdx],
      });
      addedCount++;
      idx++;
    }
  }

  return {
    leftLines,
    rightLines,
    stats: {
      added: addedCount,
      removed: removedCount,
      modified: modifiedCount,
    },
  };
}
