const axios = jest.createMockFromModule('axios')

axios.get = jest.fn().mockResolvedValue({})
axios.post = jest.fn().mockResolvedValue({})
axios.create = jest.fn().mockReturnValue({})

module.exports = axios
