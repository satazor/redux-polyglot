import { is } from 'ramda';
import { setLanguage } from './actions';

const isString = is(String);
const isFunction = is(Function);

const checkParams = (catchedActionType, getLocale, getPhrases) => {
    if (!catchedActionType || !getLocale || !getPhrases)
        throw (new Error('polyglotMiddleware : missing parameters.'));
    if (!isString(catchedActionType))
        throw (new Error('polyglotMiddleware : first parameter must be a string.'));
    if (!isFunction(getLocale))
        throw (new Error('polyglotMiddleware : second parameter must be a function.'));
    if (!isFunction(getPhrases))
        throw (new Error('polyglotMiddleware : third parameter must be a function.'));
};

export const createPolyglotMiddleware = (catchedActionType, getLocale, getPhrases) => {
    checkParams(catchedActionType, getLocale, getPhrases);
    return store => next => action => {
        if (catchedActionType === action.type) {
            const locale = getLocale(action);
            const previousLocale = store.getState().polyglot.locale;
            if (previousLocale !== locale) {
                getPhrases(locale).then(phrases => {
                    store.dispatch(setLanguage(locale, phrases));
                    next(action);
                });
                return;
            }
        }
        next(action);
    };
};
