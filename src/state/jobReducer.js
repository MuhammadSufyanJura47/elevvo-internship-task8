export function jobReducer(state, action) {
  switch (action.type) {
    case "HYDRATE": {
      return { ...state, applications: action.payload };
    }
    case "ADD": {
      return { ...state, applications: [action.payload, ...state.applications] };
    }
    case "UPDATE": {
      const updated = state.applications.map((a) =>
        a.id === action.payload.id ? action.payload : a
      );
      return { ...state, applications: updated };
    }
    case "DELETE": {
      const filtered = state.applications.filter((a) => a.id !== action.payload);
      return { ...state, applications: filtered };
    }
    case "IMPORT_REPLACE": {
      return { ...state, applications: action.payload };
    }
    default:
      return state;
  }
}