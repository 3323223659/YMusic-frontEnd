const getters = {
  token: state => state.user.token,
  id: state => state.user.userInfo.id,
  name: state => state.user.userInfo.name
}
export default getters
