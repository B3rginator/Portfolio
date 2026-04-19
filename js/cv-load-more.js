// ===== CV LOAD MORE MODULE =====

export function initCvLoadMore() {
    const pageSize = 3;
    const experienceColumn = document.querySelector('.cv-experience-column');
    const itemsContainer = experienceColumn?.querySelector('.cv-experience-items');

    if (!itemsContainer) {
        return;
    }

    const experienceItems = Array.from(itemsContainer.querySelectorAll(':scope > .cv-item'));

    if (experienceItems.length <= pageSize) {
        return;
    }

    let visibleCount = pageSize;

    experienceItems.slice(pageSize).forEach((item) => {
        item.hidden = true;
    });

    const loadMoreWrap = document.createElement('div');
    loadMoreWrap.className = 'cv-load-more-wrap';

    const loadMoreButton = document.createElement('button');
    loadMoreButton.type = 'button';
    loadMoreButton.className = 'btn btn-primary cv-load-more';
    loadMoreButton.setAttribute('data-i18n', 'cv.loadMore');
    loadMoreButton.textContent = 'Vis flere';

    loadMoreButton.addEventListener('click', () => {
        const nextItems = experienceItems.slice(visibleCount, visibleCount + pageSize);

        nextItems.forEach((item) => {
            item.hidden = false;
        });

        visibleCount += nextItems.length;

        if (visibleCount >= experienceItems.length) {
            loadMoreWrap.remove();
        }
    });

    loadMoreWrap.appendChild(loadMoreButton);
    itemsContainer.insertAdjacentElement('afterend', loadMoreWrap);
}