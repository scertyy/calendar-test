# calendar app. 

## Event Visualization Component.
```
Calendar-component which can visualize events Array.
For add custom calendar date use slot in Calendar component
Example: 
<Calendar>
    <template #day="{ day }">
        <div>день {{ day.day }};</div>
    </template>
</Calendar>
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```