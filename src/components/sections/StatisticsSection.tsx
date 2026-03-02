import { useState, useEffect } from 'react';
import { Users, Award, BookOpen, Globe } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/hooks/useScrollReveal';

interface Statistic {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix: string;
  color: string;
}

const CounterAnimation = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const increment = target / 50;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);
    return () => clearInterval(interval);
  }, [target]);

  return <span>{count.toLocaleString('id-ID')}</span>;
};

const StatisticsSection = () => {
  const stats: Statistic[] = [
    {
      icon: <Users className="w-8 h-8" />,
      label: 'Total Mahasiswa',
      value: 3500,
      suffix: '+',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      label: 'Program Studi',
      value: 14,
      suffix: '',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: <Award className="w-8 h-8" />,
      label: 'Akreditasi',
      value: 100,
      suffix: '%',
      color: 'from-amber-500 to-amber-600',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      label: 'Kerjasama Internasional',
      value: 25,
      suffix: '+',
      color: 'from-green-500 to-green-600',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="section-container">
        {/* Header */}
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">
              Pencapaian & Statistik
            </h2>
            <p className="text-lg text-muted-foreground">
              Pertumbuhan konsisten dalam pendidikan berkualitas dan pengembangan infrastruktur akademik
            </p>
          </div>
        </ScrollReveal>

        {/* Statistics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 100}>
              <Card className={`relative overflow-hidden p-8 bg-gradient-to-br ${stat.color} text-white group hover:shadow-xl transition-all duration-300`}>
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-32 h-32 bg-white rounded-full" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-4 p-3 bg-white/20 rounded-lg w-fit group-hover:bg-white/30 transition-colors">
                    {stat.icon}
                  </div>

                  {/* Counter Value */}
                  <div className="mb-2">
                    <div className="text-4xl lg:text-5xl font-heading font-bold">
                      <CounterAnimation target={stat.value} />
                      {stat.suffix}
                    </div>
                  </div>

                  {/* Label */}
                  <p className="text-base font-medium opacity-90">
                    {stat.label}
                  </p>
                </div>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20" />
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* Additional Info */}
        <ScrollReveal>
          <div className="bg-primary/5 rounded-xl p-8 border border-primary/10">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-heading font-semibold text-lg text-primary mb-2">Kampus Modern</h3>
                <p className="text-sm text-muted-foreground">
                  Fasilitas laboratorium, library, dan ruang belajar dengan teknologi terkini
                </p>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg text-primary mb-2">Dosen Berpengalaman</h3>
                <p className="text-sm text-muted-foreground">
                  Tenaga pengajar dengan sertifikasi profesional dan pengalaman industri
                </p>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg text-primary mb-2">Koneksi Global</h3>
                <p className="text-sm text-muted-foreground">
                  Pertukaran pelajar dan program kolaborasi dengan universitas internasional
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default StatisticsSection;
