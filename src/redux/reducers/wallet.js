// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  SEARCH_BEGIN,
  SEARCH_CURRENCIES,
  EXPENSES_OBJECT_LIST,
  EXPENSES_UPDATE_ROW,
  ID_EXPENSE_EDIT,
  EXPENSE_EDIT,
  EXPENSE_SAVE_UPDATE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEARCH_BEGIN:
    return {
      ...state,
    };
  case SEARCH_CURRENCIES:
    return {
      ...state, currencies: action.payload,
    };
  case EXPENSES_OBJECT_LIST:
    return {
      ...state, expenses: [...state.expenses, action.payload],
    };
  case EXPENSES_UPDATE_ROW:
    return {
      ...state, expenses: action.payload,
    };
  case ID_EXPENSE_EDIT:
    return {
      ...state, idToEdit: action.payload,
    };
  case EXPENSE_EDIT:
    return {
      ...state, editor: action.payload,
    };
  case EXPENSE_SAVE_UPDATE:
    return {
      ...state,
      expenses: state.expenses.map((e) => {
        if (e.id === action.payload.id) {
          return {
            ...e, ...action.payload,
          };
        }
        return e;
      }),
    };
  default:
    return state;
  }
};

export default wallet;
