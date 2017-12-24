export const colors = [ 'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'green', 'amber', 'orange', 'deep-orange' ]

export default () => colors[Math.random() * (colors.length - 1) >> 0]
