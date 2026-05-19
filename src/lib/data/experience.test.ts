import { describe, it, expect } from 'vitest'
import { roles, kpis, contact, skillsMatrix, softSkills } from './experience'

describe('experience data', () => {
  it('has two PT Boer roles, newest first', () => {
    expect(roles).toHaveLength(2)
    expect(roles[0].title).toBe('Product Operations Analyst')
    expect(roles[0].end).toBe('present')
    expect(roles[1].title).toBe('Intern')
    expect(roles.every((r) => r.company === 'PT Boer Technology')).toBe(true)
  })

  it('every role has >=3 bullets and a non-empty stack', () => {
    for (const r of roles) {
      expect(r.bullets.length).toBeGreaterThanOrEqual(3)
      expect(r.stack.length).toBeGreaterThan(0)
    }
  })

  it('kpis and contact match the CV', () => {
    expect(kpis).toHaveLength(3)
    expect(kpis.find((k) => k.label.includes('GPA'))?.value).toBe('3.54')
    expect(contact.email).toBe('h4fizcareer@gmail.com')
    expect(contact.linkedin).toBe('linkedin.com/in/hafizcareer')
    expect(contact.location).toContain('Karawang')
  })

  it('skills matrix and soft skills are populated', () => {
    expect(skillsMatrix.length).toBeGreaterThanOrEqual(5)
    for (const row of skillsMatrix) {
      expect(row.category).toBeTruthy()
      expect(row.daily.length).toBeGreaterThan(0)
    }
    expect(softSkills.length).toBeGreaterThanOrEqual(4)
  })
})
