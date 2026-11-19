import assert from 'node:assert/strict'
import test from 'node:test'
import { adminTalentExamples, expertiseOptions } from '../src/mocks/talents.js'
import { getMockAdminTalentById, listMockAdminTalents } from '../src/services/talentService.js'

test('douze profils fictifs distincts avec origine et qualification explicites', () => {
  const talents = listMockAdminTalents()
  assert.equal(talents.length, 12)
  assert.equal(new Set(talents.map(({ id }) => id)).size, 12)
  assert.deepEqual(new Set(talents.map(({ qualificationStatus }) => qualificationStatus)), new Set([
    'QUALIFIED', 'NOT_EVALUATED', 'SELECTED_FOR_REVIEW', 'INTERVIEW_SCHEDULED', 'NOT_QUALIFIED',
  ]))
  assert.deepEqual(new Set(talents.map(({ source }) => source)), new Set(['WENOVAT', 'EXTERNAL']))
  assert.deepEqual(new Set(talents.map(({ availability }) => availability)), new Set(['IMMEDIATE', 'WITHIN_MONTH', 'LATER']))
  const allowedExpertise = new Set(expertiseOptions.map(({ value }) => value))
  for (const talent of talents) {
    assert.match(talent.id, /^exemple-talent-\d{2}$/)
    assert.ok(talent.firstName && talent.lastName && talent.architectTitle && talent.location)
    assert.ok(talent.expertise.length && talent.expertise.every((item) => allowedExpertise.has(item)))
    assert.ok(talent.dailyRate === null || (Number.isFinite(talent.dailyRate) && talent.dailyRate > 0))
    if (talent.source === 'EXTERNAL') assert.notEqual(talent.qualificationStatus, 'QUALIFIED')
  }
  assert.equal(adminTalentExamples.length, 12)
})

test('les lectures admin sont isolées et un identifiant inconnu est absent', () => {
  const talents = listMockAdminTalents()
  const id = talents[0].id
  talents[0].firstName = 'Modifié'
  talents[0].expertise.push('AUTRE')
  const detail = getMockAdminTalentById(id)
  assert.notEqual(detail.firstName, 'Modifié')
  assert.equal(detail.expertise.includes('AUTRE'), false)
  detail.expertise.push('AUTRE')
  assert.equal(getMockAdminTalentById(id).expertise.includes('AUTRE'), false)
  assert.equal(getMockAdminTalentById('inconnu'), null)
  assert.equal(getMockAdminTalentById('nouveau'), null)
})
