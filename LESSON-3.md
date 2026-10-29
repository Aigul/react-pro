# LESSON-3 - Advanced Redux и асинхронность
Ветка: lesson-3

## Запуск
npm ci && npm run dev
npm run build

## Чеклист
- [x] API корректно описан и экспортирует хук useGetTasksQuery
- [x] Загрузка задач происходит без ошибок
- [x] Используется transformResponse для получения массива
- [x] Реализован хук useTasks, в котором данные загружаются через useGetTasksQuery
- [x] Задачи отображаются в интерфейсе
- [x] Код структурирован и соотвествует FSD
- [x] Использован useEffect для загрузки данных в useState
- [x] Реализована функция removeTask
- [x] После удаления задача исчезает из UI
- [ ] baseApi создан и экспортирован из shared/api/baseApi.ts, tagTypes включает Tasks
- [ ] tasksApi использует injectEndpoint от baseApi; getTasks корректно возвращает Task[]
- [ ] В store подключены baseApi.reducer и baseApi.middleware один раз  