document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. ПЛАВНЫЕ АНИМАЦИИ ПРИ СКРОЛЛЕ (INTERSECTION OBSERVER)
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
    // 2. ДИНАМИЧЕСКИЙ ФИЛЬТР КУРСОВ И ПОИСК
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
    // 3. ОБРАБОТКА ФОРМЫ (Имитация)
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