import fs from 'node:fs'
import path from 'node:path'

const exts = ['.html', '.scss', '.js', '.md']
const renames = []

function scanAssets(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) scanAssets(p)
    else if (entry.name.endsWith('.png')) {
      const buf = fs.readFileSync(p)
      if (buf[0] === 0x3c) {
        renames.push({
          from: p,
          to: `${p.slice(0, -4)}.svg`,
          oldBase: entry.name,
          newBase: `${entry.name.slice(0, -4)}.svg`,
        })
      }
    }
  }
}

scanAssets('src/assets/images')

for (const r of renames) {
  if (!fs.existsSync(r.from)) continue
  if (fs.existsSync(r.to)) fs.unlinkSync(r.to)
  fs.renameSync(r.from, r.to)
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === 'scripts') continue
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(p, files)
    else if (exts.some((x) => entry.name.endsWith(x))) files.push(p)
  }
  return files
}

let updated = 0
for (const file of walk('.')) {
  const content = fs.readFileSync(file, 'utf8')
  let next = content
  for (const r of renames) {
    next = next.split(r.oldBase).join(r.newBase)
  }
  if (next !== content) {
    fs.writeFileSync(file, next)
    updated++
  }
}

console.log(`Renamed ${renames.length} assets, updated ${updated} source files`)
