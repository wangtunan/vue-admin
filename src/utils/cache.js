import storage from 'good-storage'
const TAGS_KEY = 'admin_tags_key'
const TAGS_MAX_LEN = 20

// tags模块
export function setTagsCache (tags) {
  if (tags.length > TAGS_MAX_LEN) {
    tags.shift()
  }
  storage.set(TAGS_KEY, tags)
}
export function getTagsCache () {
  return storage.get(TAGS_KEY, [])
}
