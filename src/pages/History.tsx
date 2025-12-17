import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: string;
  metrics?: { label: string; value: string }[];
}

const timelineEvents: TimelineEvent[] = [
  {
    year: '2000',
    title: 'Основание компании',
    description: 'Создание АО «Дельта Агро» и начало сельскохозяйственной деятельности в Волгоградской области',
    icon: 'Sprout',
    metrics: [
      { label: 'Земли', value: '15 000 га' },
      { label: 'Сотрудники', value: '120 человек' }
    ]
  },
  {
    year: '2003',
    title: 'Расширение земельного банка',
    description: 'Первая волна расширения — приобретение дополнительных земельных участков и увеличение посевных площадей',
    icon: 'TrendingUp',
    metrics: [
      { label: 'Земли', value: '35 000 га' },
      { label: 'Районы', value: '2 района' }
    ]
  },
  {
    year: '2007',
    title: 'Модернизация техники',
    description: 'Закупка современной сельхозтехники ведущих мировых производителей. Начало внедрения GPS-навигации',
    icon: 'Tractor',
    metrics: [
      { label: 'Техника', value: '45 единиц' },
      { label: 'Инвестиции', value: '250 млн ₽' }
    ]
  },
  {
    year: '2010',
    title: 'Развитие инфраструктуры',
    description: 'Строительство современных зернохранилищ и логистических комплексов для оптимизации хранения и отгрузки продукции',
    icon: 'Building',
    metrics: [
      { label: 'Хранилища', value: '50 000 тонн' },
      { label: 'Земли', value: '62 000 га' }
    ]
  },
  {
    year: '2014',
    title: 'Точное земледелие',
    description: 'Внедрение технологий точного земледелия, систем мониторинга полей и оптимизации использования ресурсов',
    icon: 'Satellite',
    metrics: [
      { label: 'Сотрудники', value: '400 человек' },
      { label: 'Урожайность', value: '+35%' }
    ]
  },
  {
    year: '2017',
    title: 'Устойчивое развитие',
    description: 'Запуск программы устойчивого земледелия. Научно обоснованные севообороты и забота о плодородии почв',
    icon: 'Leaf',
    metrics: [
      { label: 'Земли', value: '85 000 га' },
      { label: 'Районы', value: '4 района' }
    ]
  },
  {
    year: '2020',
    title: 'Цифровизация',
    description: 'Внедрение цифровых систем управления хозяйством. Мониторинг техники и полей в реальном времени',
    icon: 'Smartphone',
    metrics: [
      { label: 'Автоматизация', value: '95%' },
      { label: 'Эффективность', value: '+42%' }
    ]
  },
  {
    year: '2024',
    title: 'Масштаб и надёжность',
    description: 'Крупнейший агрохолдинг региона с полным циклом производства. Стабильный партнёр для бизнеса и надёжный работодатель',
    icon: 'Award',
    metrics: [
      { label: 'Земли', value: '106 000+ га' },
      { label: 'Сотрудники', value: '650+ человек' },
      { label: 'Опыт', value: '25 лет' }
    ]
  }
];

const History = () => {
  const [visibleEvents, setVisibleEvents] = useState<{ [key: number]: boolean }>({});
  const [activeEvent, setActiveEvent] = useState<number | null>(null);
  const eventRefs = useRef<{ [key: number]: HTMLElement | null }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    timelineEvents.forEach((_, index) => {
      const element = eventRefs.current[index];
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleEvents((prev) => ({ ...prev, [index]: true }));
            }
          },
          { threshold: 0.2 }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const setEventRef = (index: number) => (el: HTMLElement | null) => {
    eventRefs.current[index] = el;
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center space-x-3 cursor-pointer" 
              onClick={() => navigate('/')}
            >
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Icon name="Sprout" className="text-white" size={28} />
              </div>
              <div>
                <div className="text-xl font-bold font-heading text-foreground leading-tight">Дельта Агро</div>
                <div className="text-xs text-muted-foreground">с 2000 года</div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/#about" className="text-foreground hover:text-primary transition-colors font-medium">О компании</a>
              <a href="/#directions" className="text-foreground hover:text-primary transition-colors font-medium">Деятельность</a>
              <a href="/#career" className="text-foreground hover:text-primary transition-colors font-medium">Карьера</a>
              <a href="/#contacts" className="text-foreground hover:text-primary transition-colors font-medium">Контакты</a>
            </div>
            <Button 
              className="hidden md:block bg-primary hover:bg-accent text-white"
              onClick={() => navigate('/')}
            >
              На главную
            </Button>
          </div>
        </nav>
      </header>

      <section className="pt-32 pb-24 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-block px-4 py-1 bg-primary/10 rounded-full mb-6">
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">История</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6 text-foreground">
              25 лет роста и развития
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Путь от небольшого хозяйства до крупнейшего агрохолдинга Волгоградской области. 
              История стабильного развития, инноваций и ответственного подхода к делу.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent transform md:-translate-x-1/2"></div>

              {timelineEvents.map((event, index) => {
                const isLeft = index % 2 === 0;
                const isVisible = visibleEvents[index];
                const isActive = activeEvent === index;

                return (
                  <div
                    key={index}
                    ref={setEventRef(index)}
                    className={`relative mb-16 md:mb-24 ${
                      isLeft ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
                    }`}
                    onMouseEnter={() => setActiveEvent(index)}
                    onMouseLeave={() => setActiveEvent(null)}
                  >
                    <div className={`ml-20 md:ml-0 ${isLeft ? 'md:mr-16' : 'md:ml-16'}`}>
                      <Card
                        className={`p-8 border-2 transition-all duration-500 cursor-pointer ${
                          isActive 
                            ? 'border-primary shadow-2xl scale-105 bg-primary/5' 
                            : 'border-gray-200 hover:border-primary/50 hover:shadow-xl'
                        } ${
                          isVisible 
                            ? isLeft 
                              ? 'animate-slide-in-right' 
                              : 'animate-slide-in-left'
                            : 'opacity-0'
                        }`}
                        style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
                      >
                        <div className={`flex items-start gap-4 ${isLeft ? 'md:flex-row-reverse md:text-right' : ''}`}>
                          <div className={`w-16 h-16 bg-gradient-to-br ${
                            index % 3 === 0 ? 'from-primary to-accent' :
                            index % 3 === 1 ? 'from-secondary to-primary' :
                            'from-accent to-secondary'
                          } rounded-2xl flex items-center justify-center flex-shrink-0 ${
                            isActive ? 'scale-110' : ''
                          } transition-transform`}>
                            <Icon name={event.icon as any} className="text-white" size={32} />
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold font-heading mb-2 text-foreground">
                              {event.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                              {event.description}
                            </p>
                            
                            {event.metrics && (
                              <div className={`grid grid-cols-2 gap-3 ${isLeft ? 'md:justify-end' : ''}`}>
                                {event.metrics.map((metric, idx) => (
                                  <div key={idx} className="bg-white rounded-lg p-3 border border-gray-200">
                                    <div className="text-sm text-muted-foreground mb-1">{metric.label}</div>
                                    <div className="text-lg font-bold text-primary">{metric.value}</div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    </div>

                    <div className={`absolute top-8 ${isLeft ? 'left-8 md:right-0 md:left-auto' : 'left-8 md:left-1/2'} transform ${isLeft ? 'md:-translate-x-1/2' : 'md:-translate-x-1/2'} z-10`}>
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 border-white shadow-xl ${
                        isActive ? 'bg-primary scale-110' : 'bg-white'
                      } transition-all duration-300`}>
                        <span className={`text-xl font-bold font-heading ${
                          isActive ? 'text-white' : 'text-primary'
                        }`}>
                          {event.year}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-primary to-accent text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Продолжаем расти вместе
            </h2>
            <p className="text-xl mb-12 leading-relaxed opacity-90">
              За 25 лет мы прошли путь от небольшого хозяйства до крупнейшего агрохолдинга региона. 
              И это только начало — впереди новые проекты, технологии и достижения.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-5xl font-bold font-heading mb-2">7x</div>
                <div className="text-lg opacity-90">рост земельного банка</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-5xl font-bold font-heading mb-2">5x</div>
                <div className="text-lg opacity-90">увеличение команды</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-5xl font-bold font-heading mb-2">100%</div>
                <div className="text-lg opacity-90">цифровизация процессов</div>
              </div>
            </div>

            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100 px-10 py-6 text-lg font-semibold"
              onClick={() => navigate('/')}
            >
              Узнать больше о компании
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-4 cursor-pointer" onClick={() => navigate('/')}>
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Icon name="Sprout" className="text-white" size={28} />
                </div>
                <div>
                  <div className="text-xl font-bold font-heading">Дельта Агро</div>
                  <div className="text-xs text-white/60">с 2000 года</div>
                </div>
              </div>
              <p className="text-white/70 text-sm">
                Региональный агрохолдинг полного производственного цикла
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-lg">Компания</h4>
              <ul className="space-y-3 text-white/70 text-sm">
                <li><a href="/#about" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="/history" className="hover:text-white transition-colors">История</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Структура</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-lg">Деятельность</h4>
              <ul className="space-y-3 text-white/70 text-sm">
                <li><a href="/#directions" className="hover:text-white transition-colors">Направления</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Продукция</a></li>
                <li><a href="#" className="hover:text-white transition-colors">География</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-lg">Контакты</h4>
              <ul className="space-y-3 text-white/70 text-sm">
                <li><a href="/#career" className="hover:text-white transition-colors">Карьера</a></li>
                <li><a href="/#contacts" className="hover:text-white transition-colors">Связаться</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm">
            <p>&copy; 2000-2024 АО «Дельта Агро». Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default History;
