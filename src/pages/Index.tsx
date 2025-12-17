import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import VolgoградMap from '@/components/VolgoградMap';

const Index = () => {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const observerRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    Object.keys(observerRefs.current).forEach((key) => {
      const element = observerRefs.current[key];
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible((prev) => ({ ...prev, [key]: true }));
            }
          },
          { threshold: 0.1 }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const setRef = (key: string) => (el: HTMLElement | null) => {
    observerRefs.current[key] = el;
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Sprout" className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold font-heading text-foreground">Дельта Агро</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">О компании</a>
              <a href="#products" className="text-foreground hover:text-primary transition-colors font-medium">Реализация</a>
              <a href="#career" className="text-foreground hover:text-primary transition-colors font-medium">Вакансии</a>
              <a href="#contacts" className="text-foreground hover:text-primary transition-colors font-medium">Контакты</a>
            </div>
            <Button className="hidden md:block bg-primary hover:bg-accent">
              Связаться с нами
            </Button>
          </div>
        </nav>
      </header>

      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://cdn.poehali.dev/projects/3658e344-b9b8-473f-8551-015ae358aec7/files/9722be89-c885-48fb-9f58-59532078d567.jpg" 
            alt="Поля Дельта Агро" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="container mx-auto px-6 z-10 text-center text-white">
          <h1 className="text-6xl md:text-8xl font-bold font-heading mb-6 animate-fade-in">
            АО «Дельта Агро»
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            Региональный агрохолдинг полного цикла. Выращивание зерновых и зернобобовых культур с 2000 года
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mt-16">
            <div className="animate-scale-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              <div className="text-5xl font-bold font-heading text-secondary mb-2">106 000+</div>
              <div className="text-lg">гектаров</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              <div className="text-5xl font-bold font-heading text-secondary mb-2">650+</div>
              <div className="text-lg">сотрудников</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
              <div className="text-5xl font-bold font-heading text-secondary mb-2">25+</div>
              <div className="text-lg">лет опыта</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
              <div className="text-5xl font-bold font-heading text-secondary mb-2">1</div>
              <div className="text-lg">регион</div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 bg-muted" ref={setRef('about')}>
        <div className="container mx-auto px-6">
          <div className={`max-w-4xl mx-auto text-center ${isVisible.about ? 'animate-fade-in' : 'opacity-0'}`}>
            <h2 className="text-5xl font-bold font-heading mb-6 text-foreground">О компании</h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              АО «Дельта Агро» — крупнейший агрохолдинг Волгоградской области, специализирующийся на полном цикле 
              выращивания сельскохозяйственных культур. Мы применяем передовые технологии и современный подход 
              к земледелию, обеспечивая стабильные урожаи и высокое качество продукции.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Наша миссия — устойчивое развитие сельского хозяйства региона через инновации, 
              профессионализм команды и ответственное отношение к земле.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white" ref={setRef('directions')}>
        <div className="container mx-auto px-6">
          <h2 className={`text-5xl font-bold font-heading text-center mb-16 text-foreground ${isVisible.directions ? 'animate-fade-in' : 'opacity-0'}`}>
            Направления деятельности
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className={`p-8 border-2 hover:border-primary transition-all hover:shadow-xl ${isVisible.directions ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Icon name="Wheat" className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Растениеводство</h3>
              <p className="text-muted-foreground leading-relaxed">
                Выращивание зерновых и зернобобовых культур на площади более 106 000 гектаров 
                с применением современных агротехнологий
              </p>
            </Card>

            <Card className={`p-8 border-2 hover:border-primary transition-all hover:shadow-xl ${isVisible.directions ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mb-6">
                <Icon name="Tractor" className="text-secondary" size={32} />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Техническое оснащение</h3>
              <p className="text-muted-foreground leading-relaxed">
                Современный парк сельхозтехники ведущих мировых производителей для эффективного 
                проведения полевых работ
              </p>
            </Card>

            <Card className={`p-8 border-2 hover:border-primary transition-all hover:shadow-xl ${isVisible.directions ? 'animate-slide-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <Icon name="Package" className="text-accent" size={32} />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Реализация продукции</h3>
              <p className="text-muted-foreground leading-relaxed">
                Прямые поставки качественного зерна и зернобобовых культур оптовым покупателям 
                и переработчикам
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted relative overflow-hidden" ref={setRef('geography')}>
        <div className="container mx-auto px-6">
          <div className={`max-w-6xl mx-auto ${isVisible.geography ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1 bg-primary/10 rounded-full mb-6">
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">География</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-foreground">
                Масштаб присутствия в регионе
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Наши земли расположены в пяти районах Волгоградской области — одного из крупнейших 
                сельскохозяйственных регионов России с оптимальными условиями для земледелия
              </p>
            </div>

            <VolgoградMap />

            <div className="mt-16 grid md:grid-cols-3 gap-8">
              <Card className="p-8 text-center border-2 hover:border-primary transition-all bg-white">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Map" className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Стратегическое расположение</h3>
                <p className="text-muted-foreground">
                  Близость к крупным транспортным узлам и рынкам сбыта обеспечивает оперативную логистику
                </p>
              </Card>

              <Card className="p-8 text-center border-2 hover:border-primary transition-all bg-white">
                <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Sun" className="text-secondary" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Оптимальный климат</h3>
                <p className="text-muted-foreground">
                  Идеальные климатические условия для выращивания зерновых и зернобобовых культур
                </p>
              </Card>

              <Card className="p-8 text-center border-2 hover:border-primary transition-all bg-white">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Layers" className="text-accent" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Плодородные почвы</h3>
                <p className="text-muted-foreground">
                  Чернозёмы и каштановые почвы обеспечивают высокую урожайность и качество продукции
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative overflow-hidden" ref={setRef('tech')}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`order-2 md:order-1 ${isVisible.tech ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <img 
                src="https://cdn.poehali.dev/projects/3658e344-b9b8-473f-8551-015ae358aec7/files/6707ddfd-fd96-4a80-b5d5-6f92128a0433.jpg" 
                alt="Технологии" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
            
            <div className={`order-1 md:order-2 ${isVisible.tech ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <h2 className="text-5xl font-bold font-heading mb-6 text-foreground">Технологии и инновации</h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Мы постоянно инвестируем в развитие технологий и повышение эффективности производства.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <p className="text-lg text-foreground">Точное земледелие с использованием GPS-навигации</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <p className="text-lg text-foreground">Современные системы орошения и мелиорации</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <p className="text-lg text-foreground">Научно обоснованные севообороты</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <p className="text-lg text-foreground">Контроль качества на всех этапах производства</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="career" className="py-24 bg-primary text-white" ref={setRef('career')}>
        <div className="container mx-auto px-6">
          <div className={`max-w-4xl mx-auto text-center ${isVisible.career ? 'animate-fade-in' : 'opacity-0'}`}>
            <Icon name="Users" className="mx-auto mb-6" size={64} />
            <h2 className="text-5xl font-bold font-heading mb-6">Карьера в Дельта Агро</h2>
            <p className="text-xl mb-8 leading-relaxed opacity-90">
              Мы ищем профессионалов, готовых развиваться вместе с нами. Предлагаем стабильную работу, 
              конкурентную заработную плату и возможности для профессионального роста.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Icon name="Award" className="mx-auto mb-4" size={48} />
                <h3 className="text-xl font-bold mb-2">Профессиональное развитие</h3>
                <p className="opacity-90">Обучение и повышение квалификации</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Icon name="Heart" className="mx-auto mb-4" size={48} />
                <h3 className="text-xl font-bold mb-2">Социальный пакет</h3>
                <p className="opacity-90">Полный соцпакет и ДМС</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Icon name="TrendingUp" className="mx-auto mb-4" size={48} />
                <h3 className="text-xl font-bold mb-2">Карьерный рост</h3>
                <p className="opacity-90">Прозрачная система развития</p>
              </div>
            </div>
            
            <Button className="mt-12 bg-secondary hover:bg-secondary/90 text-foreground px-8 py-6 text-lg">
              Посмотреть вакансии
            </Button>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-24 bg-muted" ref={setRef('contacts')}>
        <div className="container mx-auto px-6">
          <h2 className={`text-5xl font-bold font-heading text-center mb-16 text-foreground ${isVisible.contacts ? 'animate-fade-in' : 'opacity-0'}`}>
            Свяжитесь с нами
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className={isVisible.contacts ? 'animate-slide-in-left' : 'opacity-0'}>
              <h3 className="text-2xl font-bold font-heading mb-6 text-foreground">Контактная информация</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-foreground">Адрес</h4>
                    <p className="text-muted-foreground">Волгоградская область</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-foreground">Телефон</h4>
                    <p className="text-muted-foreground">+7 (XXX) XXX-XX-XX</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Mail" className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-foreground">Email</h4>
                    <p className="text-muted-foreground">info@deltaagro.ru</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className={`p-8 ${isVisible.contacts ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <h3 className="text-2xl font-bold font-heading mb-6 text-foreground">Форма обратной связи</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Ваше имя</label>
                  <Input placeholder="Иван Иванов" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
                  <Input type="email" placeholder="ivan@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Сообщение</label>
                  <Textarea placeholder="Ваше сообщение..." rows={4} />
                </div>
                <Button className="w-full bg-primary hover:bg-accent">
                  Отправить сообщение
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Sprout" className="text-white" size={24} />
                </div>
                <span className="text-xl font-bold font-heading">Дельта Агро</span>
              </div>
              <p className="text-white/70">
                Региональный агрохолдинг полного цикла
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Компания</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#about" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="/history" className="hover:text-white transition-colors">История</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Структура</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Деятельность</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#products" className="hover:text-white transition-colors">Продукция</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Техника</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Технологии</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#career" className="hover:text-white transition-colors">Вакансии</a></li>
                <li><a href="#contacts" className="hover:text-white transition-colors">Связаться</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/70">
            <p>&copy; 2000-2024 АО «Дельта Агро». Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;