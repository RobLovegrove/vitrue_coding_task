describe('store.updateStatus', () => {
    let store
  
    beforeEach(() => {
      jest.resetModules()
      store = require('../data/store')
    })
  
    test('returns null for unknown suggestion id', () => {
      const result = store.updateStatus('does-not-exist', 'pending')
      expect(result).toBeNull()
    })
  })