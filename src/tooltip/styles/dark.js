import create from '../../styles/_utils/create-component-base'
import popoverStyle from '../../popover/styles/dark'

export default create({
  theme: 'dark',
  name: 'Tooltip',
  peer: [
    popoverStyle
  ],
  getDerivedVariables ({ base, derived }) {
    return {}
  }
})