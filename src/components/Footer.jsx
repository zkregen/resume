import React from 'react';
import { Send, Mail, ExternalLink } from 'lucide-react';

const Footer = () => (
  <footer id="contacts" className="section-block border-t border-emerald-100 bg-emerald-50/10">
    <div className="page-col">
      <p className="section-label">Зв'язок</p>
      <div className="section-divider" />

      <p className="text-zinc-600 text-sm mb-5 leading-relaxed">
        Готовий до нових проєктів. Відповідаю протягом кількох годин.
      </p>

      <div className="flex flex-wrap gap-3">
        <a
          id="footer-telegram"
          href="https://t.me/your_handle"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-green"
        >
          <Send size={15} />
          Telegram
        </a>
        <a
          id="footer-email"
          href="mailto:your@email.com"
          className="btn-secondary"
        >
          <Mail size={15} className="text-emerald-600" />
          Email
        </a>
        <a
          id="footer-freelancehunt"
          href="https://freelancehunt.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          <ExternalLink size={15} className="text-emerald-600" />
          Freelancehunt
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
