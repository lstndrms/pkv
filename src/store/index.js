import {createStore} from 'vuex';

export default createStore({
    state() {
        return {
            auth_token: ''
        }
    },
    getters() {

    },
    mutations() {
        SET_TOKEN: (state, payload) => {
            state.auth_token = payload;
        }
    },
    actions() {
        SET_TOKEN: (context, payload) => {
            context.commit('SET_TOKEN', payload);
        }
    }
})