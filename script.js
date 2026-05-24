document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. АВТОМАТИЧЕСКИЙ И РУЧНОЙ СЛАЙДЕР (СЕКЦИЯ HERO)
    // ==========================================================================
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000; // Смена слайдов каждые 5 секунд

    function showSlide(index) {
        // Убираем активные классы со всех слайдов и точек
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Корректируем индекс, если вышли за пределы массива
        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;

        // Активируем нужный слайд и точку
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        currentSlide++;
        showSlide(currentSlide);
    }

    // Запуск автоматического переключения
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    // Сброс таймера при ручном клике, чтобы слайд не переключился сразу
    function resetSlideShow() {
        clearInterval(slideInterval);
        startSlideShow();
    }

    // Клик по индикаторным точкам
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            resetSlideShow();
        });
    });

    // Инициализация слайдера
    if (slides.length > 0) {
        startSlideShow();
    }


    // ==========================================================================
    // 2. ПЛАВНЫЕ АНИМАЦИИ ПРИ СКРОЛЛЕ (INTERSECTION OBSERVER)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScrollOptions = {
        threshold: 0.15, // Элемент начнет анимацию, когда появится на 15% в окне
        rootMargin: "0px 0px -50px 0px" // Небольшой отступ снизу для лучшего визуального восприятия
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Прекращаем наблюдение за элементом после того, как он один раз появился
                observer.unobserve(entry.target);
            }
        });
    }, revealOnScrollOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // ==========================================================================
    // 3. ДИНАМИЧЕСКИЙ ФИЛЬТР КУРСОВ И ПОИСК
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const catalogCards = document.querySelectorAll('.catalog-card');
    const searchInput = document.getElementById('courseSearch');

    function filterCourses() {
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        const searchText = searchInput.value.toLowerCase().trim();

        catalogCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardTitle = card.querySelector('.catalog-card__title').textContent.toLowerCase();
            
            const matchesCategory = (activeFilter === 'all' || cardCategory === activeFilter);
            const matchesSearch = cardTitle.includes(searchText);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterCourses();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', filterCourses);
    }


    // ==========================================================================
    // 4. ОБРАБОТКА ФОРМЫ (Имитация)
    // ==========================================================================
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = leadForm.querySelector('input[type="text"]').value;
            const phone = leadForm.querySelector('input[type="tel"]').value;
            alert(`Спасибо, ${name}! Заявка принята. Ожидайте звонка на номер: ${phone}`);
            leadForm.reset();
        });
    }
});