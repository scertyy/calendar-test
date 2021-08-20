import moment from "moment";
export default {
    id: {
        type: [Number, String],
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    date: {
        type: moment(),
        required: true,
    },
    eventType: {
        type: String,
        required: true,
    },
};
