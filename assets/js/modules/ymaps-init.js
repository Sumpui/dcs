var myMap, myCollection, dotesTargets, areaTargets, trajectoryTargets;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

function init () {
    // var myCoordSystem = new ymaps.CartesianCoordSystem(
    //     new ymaps.Point(0, 0), // Координаты левого нижнего угла карты
    //     new ymaps.Point(300, 300), // Координаты правого верхнего угла карты
    //     1 // Длина единичного отрезка в метрах
    // );
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    myMap = new ymaps.Map('dynamic-map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: [55.76, 37.64], // Москва
        zoom: 5,
    });


    myCollection = new ymaps.GeoObjectCollection({}, {
        preset: 'twirl#redIcon',
        draggable: false
    });

    dotesTargets = new ymaps.GeoObjectCollection({}, {
      preset: 'twirl#redIcon',
      draggable: false
    });

}