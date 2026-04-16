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

    test('updates status and dateUpdated for a valid suggestion', () => {
        const id = '550e8400-e29b-41d4-a716-446655440001'
        const result = store.updateStatus(id, 'in_progress')
        expect(result).not.toBeNull()
        expect(result.status).toBe('in_progress')
        expect(result.dateUpdated).toBeDefined()
        expect(Number.isNaN(Date.parse(result.dateUpdated))).toBe(false)
    })

    test('refreshes dateUpdated on each status change', () => {
        jest.useFakeTimers()
        const id = '550e8400-e29b-41d4-a716-446655440001'
        jest.setSystemTime(new Date('2026-01-01T10:00:00.000Z'))
        const first = store.updateStatus(id, 'pending')
        jest.setSystemTime(new Date('2026-01-01T10:00:01.000Z'))
        const second = store.updateStatus(id, 'in_progress')
        expect(second.dateUpdated).not.toBe(first.dateUpdated)
        expect(second.dateUpdated).toBe('2026-01-01T10:00:01.000Z')
        jest.useRealTimers()
      })
})