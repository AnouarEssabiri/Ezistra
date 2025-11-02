export type BackupBlob = {
  backupId: string
  clientId?: string
  createdAt: string
  stores: Record<string, any[]>
}

export async function uploadBackup(backup: BackupBlob, token?: string) {
  const res = await fetch('/api/sync/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(backup),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Upload failed: ${res.status} ${text}`)
  }

  return res.json()
}

export async function downloadLatestBackup(token?: string) {
  const url = '/api/sync/download'
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Download failed: ${res.status} ${text}`)
  }

  return res.json()
}
