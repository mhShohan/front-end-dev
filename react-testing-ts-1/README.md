# React Testing Library(RTL)

## RTL Queries - 8 Different query methods (Return matching node)

- getByRole ------------------ getAllByRole
- getByLabelText ------------- getAllByLabelText
- getByPlaceholderText ------- getAllByPlaceholderText
- getByText ------------------ getAllByText
- getByDisplayValue ---------- getAllByDisplayValue
- getByAltText --------------- getAllByAltText
- getByTitle ----------------- getAllByTitle
- getByTestId ---------------- getAllByTestId

### Also QueryBy (Return matching node || Returns null if no Element match)

- queryByRole --------------- queryByRole
- queryByLabelText ---------- queryByLabelText
- queryByPlaceholderText ---- queryByPlaceholderText
- queryByText --------------- queryByText
- queryByDisplayValue ------- queryByDisplayValue
- queryByAltText ------------ queryByAltText
- queryByTitle -------------- queryByTitle
- queryByTestId ------------- queryByTestId

## expect

- toBeInTheDocument
- toHaveLength

### findBy - Returns a promise which resolves when an element is found which matches the given query --- This promise is rejected if no element is found or if more then one element is found after a default timeout

### findAllBy - Returns a promise which resolves when an array of element is found which matches the given query --- This promise is rejected if no element is found after a default timeout

- findByRole --------------- findByRole
- findByLabelText ---------- findByLabelText
- findByPlaceholderText ---- findByPlaceholderText
- findByText --------------- findByText
- findByDisplayValue ------- findByDisplayValue
- findByAltText ------------ findByAltText
- findByTitle -------------- findByTitle
- findByTestId ------------- findByTestId

## Pointer Interaction

### Convenience APIs

- click()
- dblClick()
- tripleClick()
- hover()
- unhover()

### Pointer APIs

- pointer({keys: '[MouseLeft]'})
- pointer({keys: '[MouseLeft][MouseRight]'})
- pointer('[MouseLeft][MouseRight]')
- pointer('[MouseLeft>]')
- pointer('[/MouseLeft]')

## Keyboard Interaction

### Utility APIs

- type()
- clear()
- selectOptions()
- deselectOptions()
- upload()

### Convenience APIs

- tab()

### Clipboard APIs

- copy()
- cut()
- paste()

### Keyboard APIs

# Eslint + prettier + husky + lint-staged setup
