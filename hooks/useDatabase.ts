'use client'

import { useEffect, useState, useCallback } from 'react'
import DatabaseService from '@/utils/db'
import { DB } from '@/utils/db/index.table'
import type {
  Users,
  Documents,
  Address,
  University,
  HigherEducation,
  Complementary,
  Baccalaureat,
  PersonalInfoRepository,
} from '@/utils/db'

/**
 * Type-safe repository collection
 */
export interface DatabaseRepositories {
  users: Users
  documents: Documents
  address: Address
  university: University
  higherEducation: HigherEducation
  complementary: Complementary
  baccalaureat: Baccalaureat
  personalInfo: PersonalInfoRepository
}

/**
 * Hook for accessing the IndexedDB database from React components
 *
 * @example
 * ```tsx
 * const { repos, isReady, error } = useDatabase()
 *
 * useEffect(() => {
 *   if (isReady) {
 *     repos.users.getAll().then(users => console.log(users))
 *   }
 * }, [isReady, repos])
 * ```
 */
export function useDatabase() {
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const [repos] = useState<DatabaseRepositories>(
    DatabaseService.getAllRepositories() as unknown as DatabaseRepositories
  )

  // Initialize database on mount
  useEffect(() => {
    const initDB = async () => {
      try {
        const db = await DB()
        if (db) {
          setIsReady(true)
          setError(null)
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err))
        setError(error)
        setIsReady(false)
      }
    }
    initDB()
  }, [])

  return { repos, isReady, error }
}

/**
 * Hook for database operations with automatic error handling
 *
 * @example
 * ```tsx
 * const { execute, loading, error } = useDatabaseOperation()
 *
 * const handleSave = async () => {
 *   await execute(async (repos) => {
 *     return repos.users.add(userData)
 *   })
 * }
 * ```
 */
export function useDatabaseOperation<T = any>() {
  const { repos, isReady } = useDatabase()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const execute = useCallback(
    async (operation: (repos: DatabaseRepositories) => Promise<T>): Promise<T | null> => {
      if (!isReady) {
        const err = new Error('Database is not ready')
        setError(err)
        throw err
      }

      setLoading(true)
      setError(null)

      try {
        const result = await operation(repos)
        return result
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err))
        setError(error)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [repos, isReady]
  )

  return { execute, loading, error, isReady }
}

/**
 * Hook for managing a collection of records from the database
 *
 * @example
 * ```tsx
 * const { data, loading, refresh, setData } =
 *   useCollection((repos) => repos.users.getAll())
 *
 * useEffect(() => {
 *   refresh()
 * }, [])
 * ```
 */
export function useCollection<T>(fetcher: (repos: DatabaseRepositories) => Promise<T[]>) {
  const { repos, isReady } = useDatabase()
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const refresh = useCallback(async () => {
    if (!isReady) return

    setLoading(true)
    setError(null)

    try {
      const result = await fetcher(repos)
      setData(result)
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err))
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [repos, isReady, fetcher])

  // Auto-fetch on mount
  useEffect(() => {
    refresh()
  }, [refresh])

  return { data, loading, error, refresh, setData }
}

/**
 * Hook for managing a single record from the database
 *
 * @example
 * ```tsx
 * const { data, loading, error, refetch } =
 *   useRecord((repos) => repos.users.getById(userId), [userId])
 * ```
 */
export function useRecord<T>(
  fetcher: (repos: DatabaseRepositories) => Promise<T | undefined>,
  dependencies: any[] = []
) {
  const { repos, isReady } = useDatabase()
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const refetch = useCallback(async () => {
    if (!isReady) return

    setLoading(true)
    setError(null)

    try {
      const result = await fetcher(repos)
      setData(result || null)
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err))
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [repos, isReady, fetcher])

  useEffect(() => {
    refetch()
  }, [refetch, ...dependencies])

  return { data, loading, error, refetch }
}
