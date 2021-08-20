import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        events: [
            {
                id: 0,
                name: 'Событие #1 Событие #1 Событие #1 Событие #1 Событие #1 Событие #1',
                date: moment().hour(16).minute(0),
                eventType: 'red'
            },
            {
                id: 1,
                name: 'Событие #2 Событие #2 Событие #2 Событие #2 Событие #2',
                date: moment().hour(18).minute(0),
                eventType: 'green'
            },
            {
                id: 2,
                name: 'Событие #3 Событие #3 Событие #3Событие #3 Событие #3',
                date: moment()
                    .day(moment().day() + 7)
                    .hour(16)
                    .minute(0),
                eventType: 'red'
            },
            {
                id: 3,
                name: 'Событие #4 Событие #4 Событие #4 Событие #4 Событие #4',
                date: moment()
                    .day(moment().day() + 7)
                    .hour(18)
                    .minute(0),
                eventType: 'green'
            },
            {
                id: 4,
                name: 'Событие #5 Событие #5 Событие #5 Событие #5 Событие #5',
                date: moment()
                    .day(moment().day() + 4)
                    .hour(18)
                    .minute(0),
                eventType: 'orange'
            },
            {
                id: 5,
                name: 'Событие #6',
                date: moment()
                    .day(moment().day() + 15)
                    .hour(18)
                    .minute(0),
                eventType: 'orange'
            },
            {
                id: 6,
                name: 'Событие #7 Событие #7 Событие #7',
                date: moment()
                    .day(moment().day() + 22)
                    .hour(16)
                    .minute(0),
                eventType: 'red'
            },
            {
                id: 7,
                name: 'Событие #8 Событие #8 Событие #8 Событие #8 Событие #8 Событие #8',
                date: moment()
                    .day(moment().day() + 22)
                    .hour(18)
                    .minute(0),
                eventType: 'red'
            }
        ]
    },
    mutations: {},
    actions: {},
    modules: {}
})
