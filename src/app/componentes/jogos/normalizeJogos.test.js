const test = require('node:test');
const assert = require('node:assert/strict');
const { normalizeJogosData } = require('./normalizeJogos');

test('normaliza array de jogos diretamente', () => {
  const jogos = [{ partida_id: 1 }, { partida_id: 2 }];
  assert.deepEqual(normalizeJogosData(jogos), jogos);
});

test('normaliza payload com wrapper jogos', () => {
  const jogos = [{ partida_id: 1 }];
  assert.deepEqual(normalizeJogosData({ jogos }), jogos);
});

test('normaliza payload com wrapper partidas', () => {
  const partidas = [{ partida_id: 2 }];
  assert.deepEqual(normalizeJogosData({ partidas }), partidas);
});

test('retorna array vazio para payload sem jogos', () => {
  assert.deepEqual(normalizeJogosData({ foo: 'bar' }), []);
});
