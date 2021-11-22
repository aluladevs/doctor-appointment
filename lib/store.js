import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "../sagas";
import reducers from "../slices/reducers";

const store = () => {
    const sagaMiddleware = createSagaMiddleware();

    const store = configureStore({
        reducer: reducers,
        middleware: [sagaMiddleware],
    });

    sagaMiddleware.run(rootSaga);

    return store;
}

export default store();
