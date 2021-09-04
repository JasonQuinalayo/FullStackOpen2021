const initialFilter = ''

const filterReducer = (state=initialFilter, action) => {
  switch (action.type) {
    case 'FILTER':
      return action.data.filter
    default:
      return state
  }
}

export const filter = (str) => (
  {
    type: 'FILTER',
    data: { filter: str },
  }
)

export default filterReducer
