const crtsh = require('./index')

test('domain 1: uber', () => {
  return crtsh('uber.com').then(data => {
    expect(typeof data.length).toBe("number")
  })
})

test('domain 2: facebook', () => {
      return crtsh('facebook.com').then(data => {
        expect(typeof data.length).toBe("number")
      })
    })

test('invalid domain', () => {
  return expect(crtsh('ttt')).rejects.toThrow();
})

test('empty domain', () => {
  return expect(crtsh('')).rejects.toThrow();
})