import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { ScrollReveal } from '@/hooks/useScrollReveal';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Silakan masukkan email Anda');
      return;
    }

    setStatus('loading');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus('success');
      setMessage('Terima kasih! Email Anda telah didaftarkan untuk newsletter.');
      setEmail('');
      
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
      setMessage('Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
      <div className="section-container">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center">
            <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary mb-2">
              Tetap Update Berita Kampus
            </h2>
            <p className="text-muted-foreground mb-8">
              Dapatkan informasi terbaru tentang akademik, beasiswa, dan kegiatan kampus langsung ke inbox Anda
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Masukkan email Anda..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading' || status === 'success'}
                className="flex-1 px-5 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {status === 'loading' ? 'Mengirim...' : 'Daftar'}
              </button>
            </form>

            {/* Status Messages */}
            {status === 'success' && (
              <div className="mt-4 flex items-center gap-2 bg-green-50 text-green-700 px-4 py-3 rounded-lg justify-center">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm">{message}</span>
              </div>
            )}
            {status === 'error' && message && (
              <div className="mt-4 flex items-center gap-2 bg-red-50 text-red-700 px-4 py-3 rounded-lg justify-center">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{message}</span>
              </div>
            )}

            {/* Privacy Notice */}
            <p className="text-xs text-muted-foreground mt-6">
              Kami tidak akan membagikan email Anda. Lihat kebijakan privasi kami.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default NewsletterSection;
