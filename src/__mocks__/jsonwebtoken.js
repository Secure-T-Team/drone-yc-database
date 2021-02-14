const jwt = jest.createMockFromModule('jsonwebtoken')

jwt.sign = jest.fn().mockReturnValue('jwt_token')

module.exports = jwt
