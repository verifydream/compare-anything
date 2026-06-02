import React, { useEffect, useState } from 'react';
import { Shield, Save, History, FileDown, Trash, Gavel, HelpCircle, Check, Info } from 'lucide-react';

export default function LegalView() {
  const [activeSection, setActiveSection] = useState('privacy-policy');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row min-h-[500px]" id="legal-workspace">
      {/* Sidebar Table of Contents */}
      <aside className="w-full md:w-64 flex-shrink-0 border-r border-[#2d3140] p-6 sticky top-14 h-fit max-h-[calc(100vh-120px)] overflow-y-auto select-none">
        <div className="flex flex-col gap-1.5">
          <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mb-4 px-2 font-mono">Navigation</p>
          
          <button 
            type="button"
            onClick={() => scrollToSection('privacy-policy')}
            className={`text-left px-2 py-2 text-xs font-sans border-l-2 transition-all ${
              activeSection === 'privacy-policy' 
                ? 'text-[#adc6ff] border-[#adc6ff] font-semibold' 
                : 'border-transparent text-[#94a3b8] hover:bg-[#1a1d27]/40 hover:text-[#f1f5f9]'
            }`}
          >
            Privacy Policy
          </button>
          
          <div className="flex flex-col ml-4 border-l border-[#2d3140] pl-1 space-y-1">
            <button 
              type="button"
              onClick={() => scrollToSection('data-collection')}
              className="text-left px-3 py-1 text-[11px] font-sans text-[#94a3b8] hover:text-[#f1f5f9] transition-all"
            >
              • Data Collection
            </button>
            <button 
              type="button"
              onClick={() => scrollToSection('security')}
              className="text-left px-3 py-1 text-[11px] font-sans text-[#94a3b8] hover:text-[#f1f5f9] transition-all"
            >
              • Security
            </button>
            <button 
              type="button"
              onClick={() => scrollToSection('user-rights')}
              className="text-left px-3 py-1 text-[11px] font-sans text-[#94a3b8] hover:text-[#f1f5f9] transition-all"
            >
              • User Rights
            </button>
          </div>

          <button 
            type="button"
            onClick={() => scrollToSection('terms-of-service')}
            className={`text-left mt-4 px-2 py-2 text-xs font-sans border-l-2 transition-all ${
              activeSection === 'terms-of-service' 
                ? 'text-[#adc6ff] border-[#adc6ff] font-semibold' 
                : 'border-transparent text-[#94a3b8] hover:bg-[#1a1d27]/40 hover:text-[#f1f5f9]'
            }`}
          >
            Terms of Service
          </button>
          <button 
            type="button"
            onClick={() => scrollToSection('api-usage')}
            className={`text-left px-2 py-2 text-xs font-sans border-l-2 transition-all ${
              activeSection === 'api-usage' 
                ? 'text-[#adc6ff] border-[#adc6ff] font-semibold' 
                : 'border-transparent text-[#94a3b8] hover:bg-[#1a1d27]/40 hover:text-[#f1f5f9]'
            }`}
          >
            API Usage
          </button>
          <button 
            type="button"
            onClick={() => scrollToSection('compliance')}
            className={`text-left px-2 py-2 text-xs font-sans border-l-2 transition-all ${
              activeSection === 'compliance' 
                ? 'text-[#adc6ff] border-[#adc6ff] font-semibold' 
                : 'border-transparent text-[#94a3b8] hover:bg-[#1a1d27]/40 hover:text-[#f1f5f9]'
            }`}
          >
            Compliance
          </button>
        </div>
      </aside>

      {/* Document Content */}
      <section className="flex-grow p-6 md:p-8 lg:px-12 max-w-4xl space-y-12">
        <div className="pb-6 border-b border-[#2d3140]">
          <h1 className="text-xl font-bold text-[#f1f5f9] tracking-tight font-sans">Legal Documentation</h1>
          <p className="text-xs text-[#94a3b8] font-sans mt-1">Last Updated: October 24, 2024</p>
        </div>

        {/* Section: Privacy Policy */}
        <article className="scroll-mt-20 space-y-6" id="privacy-policy">
          <h2 className="text-sm font-bold text-[#adc6ff] uppercase tracking-widest font-mono flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Privacy Policy
          </h2>
          
          <div className="space-y-6 text-xs text-[#94a3b8] font-sans leading-relaxed">
            <p className="text-sm text-[#f1f5f9]/80 leading-relaxed font-sans">
              Welcome to Compare Anything. We are committed to protecting your personal data and your privacy. This Privacy Policy outlines how we handle the information provided to us when you use our technical comparison tools.
            </p>

            {/* 1. Data Collection */}
            <section className="scroll-mt-20 space-y-4" id="data-collection">
              <h3 className="text-sm font-bold text-[#f1f5f9] font-sans">1. Data Collection</h3>
              <p>We collect specific types of data to provide the "Compare Anything" service effectively. This includes:</p>
              
              <ul className="space-y-3">
                <li className="flex gap-3 bg-[#111319]/40 p-4 border border-[#2d3140] rounded-xl text-left">
                  <div className="p-2.5 bg-[#1a1d27] rounded-lg text-[#adc6ff] h-fit">
                    <Save className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#f1f5f9] block mb-1 font-sans text-xs">Saved Comparisons</strong>
                    <p className="font-sans leading-relaxed text-[#94a3b8]">When you explicitly choose to "Save" a comparison result, we store the input strings, diff metadata, and timestamps in our secure database linked to your account.</p>
                  </div>
                </li>
                <li className="flex gap-3 bg-[#111319]/40 p-4 border border-[#2d3140] rounded-xl text-left">
                  <div className="p-2.5 bg-[#1a1d27] rounded-lg text-[#adc6ff] h-fit">
                    <History className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#f1f5f9] block mb-1 font-sans text-xs">Ephemeral History</strong>
                    <p className="font-sans leading-relaxed text-[#94a3b8]">To facilitate rapid workflow, we maintain a temporary local cache of your recent comparisons. This data remains on your device unless you are logged in, at which point it may be synced for cross-device access.</p>
                  </div>
                </li>
              </ul>
            </section>

            {/* 2. Security Measures */}
            <section className="scroll-mt-20 space-y-4" id="security">
              <h3 className="text-sm font-bold text-[#f1f5f9] font-sans">2. Security Measures</h3>
              <p className="font-sans leading-relaxed">
                We employ industry-standard encryption protocols (TLS 1.3) for all data in transit. At rest, sensitive comparison data is encrypted using AES-256. Our infrastructure is hosted in ISO 27001 certified data centers with strict access controls.
              </p>
              <div className="p-4 border-l-4 border-[#adc6ff] bg-[#111319] text-xs italic text-[#adc6ff] rounded-r-lg font-sans">
                "Security is not a feature; it is the foundation of every comparison engine we build."
              </div>
            </section>

            {/* 3. User Rights */}
            <section className="scroll-mt-20 space-y-4" id="user-rights">
              <h3 className="text-sm font-bold text-[#f1f5f9] font-sans">3. User Rights</h3>
              <p>Under GDPR and CCPA regulations, you have the following rights regarding your data:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#111319]/40 border border-[#2d3140] rounded-xl text-left space-y-1.5">
                  <FileDown className="w-5 h-5 text-[#adc6ff] mb-1" />
                  <h4 className="text-xs font-bold text-[#f1f5f9] font-sans">Data Portability</h4>
                  <p className="text-[11px] leading-relaxed font-sans">Export your saved comparison history in JSON or CSV format at any time from your system profile settings.</p>
                </div>
                <div className="p-4 bg-[#111319]/40 border border-[#2d3140] rounded-xl text-left space-y-1.5">
                  <Trash className="w-5 h-5 text-[#ef4444] mb-1" />
                  <h4 className="text-xs font-bold text-[#f1f5f9] font-sans">Right to Erasure</h4>
                  <p className="text-[11px] leading-relaxed font-sans">Permanently wipe your account registration state, cookies, and all associated comparison diff arrays with a single button click.</p>
                </div>
              </div>
            </section>
          </div>
        </article>

        <hr className="border-[#2d3140]" />

        {/* Section: Terms of Service */}
        <article className="scroll-mt-20 space-y-6" id="terms-of-service">
          <h2 className="text-sm font-bold text-[#adc6ff] uppercase tracking-widest font-mono flex items-center gap-2">
            <Gavel className="w-4 h-4" />
            Terms of Service
          </h2>
          
          <div className="space-y-4 text-xs text-[#94a3b8] font-sans leading-relaxed">
            <p>By using Compare Anything, you agree to comply with and be bound by the following terms and conditions of use.</p>
            <h3 className="text-sm font-bold text-[#f1f5f9] font-sans">Usage Policies</h3>
            <p>Our comparison engine is designed for professional development, data analysis, and legal document review. Users are prohibited from using the platform to compare or store:</p>
            <ul className="list-disc ml-6 space-y-2 font-sans">
              <li>Personally Identifiable Information (PII) of third parties without consent.</li>
              <li>Malicious script fragments, malware codes, or automated scraping indices.</li>
              <li>Illegal content or data violating copyrighted intellectual property.</li>
            </ul>

            {/* API Rate limit section */}
            <div className="bg-[#111319] p-5 rounded-xl border border-[#2d3140] mt-6 scroll-mt-20 space-y-2 text-left" id="api-usage">
              <h4 className="text-xs font-bold text-[#f1f5f9] font-sans">API Usage &amp; Rate Limiting</h4>
              <p className="font-mono text-[#adc6ff] text-[11px] pb-2">// Default Rate Limit: 1000 requests / hour per user</p>
              <p className="font-sans leading-relaxed text-[#94a3b8]">
                Excessive automated querying of our diff matching engines without a verified developer API Key is strictly prohibited. We reserve rights to throttle or block IP range blocks that disrupt service stability.
              </p>
            </div>
          </div>
        </article>

        <hr className="border-[#2d3140]" />

        {/* Compliance Footer section */}
        <article className="scroll-mt-20 space-y-6 text-center" id="compliance">
          <h2 className="text-xs font-bold text-[#adc6ff] uppercase tracking-widest font-mono select-none">Compliance &amp; Transparency</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans">
            <div className="flex flex-col items-center p-4 border border-[#2d3140] bg-[#111319]/40 rounded-xl hover:border-[#adc6ff]/30 transition-all select-none">
              <div className="w-10 h-10 bg-[#adc6ff]/10 text-[#adc6ff] rounded-full flex items-center justify-center mb-3">
                <Check className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase font-bold text-[#f1f5f9]">GDPR READY</span>
            </div>
            
            <div className="flex flex-col items-center p-4 border border-[#2d3140] bg-[#111319]/40 rounded-xl hover:border-[#adc6ff]/30 transition-all select-none">
              <div className="w-10 h-10 bg-[#adc6ff]/10 text-[#adc6ff] rounded-full flex items-center justify-center mb-3">
                <Check className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase font-bold text-[#f1f5f9]">CCPA COMPLIANT</span>
            </div>

            <div className="flex flex-col items-center p-4 border border-[#2d3140] bg-[#111319]/40 rounded-xl hover:border-[#adc6ff]/30 transition-all select-none">
              <div className="w-10 h-10 bg-[#adc6ff]/10 text-[#adc6ff] rounded-full flex items-center justify-center mb-3">
                <Check className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase font-bold text-[#f1f5f9]">NO AD TRACKING</span>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
