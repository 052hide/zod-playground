import { useLocation, useNavigate } from '@remix-run/react'
import { useMemo, useState } from 'react'

import type { ValidatedQueryStringResult } from './type'

import { parse, stringify } from '~/utils/queryString'

import { QUERY_STRING_SCHEMA } from './const'

export const WithQueryString = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [queryStringState, setQueryStringState] = useState<
    'empty' | 'withRequired' | 'withOptional'
  >('empty')

  const parsedQuery = useMemo(() => {
    const r = QUERY_STRING_SCHEMA.safeParse(
      parse({ searchParams: location.search })
    )
    if (r.success) {
      return {
        success: true,
        data: r.data,
      } as const satisfies ValidatedQueryStringResult
    }
    return {
      success: false,
    } as const satisfies ValidatedQueryStringResult
  }, [location.search])

  const stringified = parsedQuery.success
    ? stringify({ parsedQuery: parsedQuery.data })
    : ''

  const handleToggleQuery = () => {
    const nextState =
      queryStringState === 'empty'
        ? 'withRequired'
        : queryStringState === 'withRequired'
          ? 'withOptional'
          : 'empty'

    navigate({
      search:
        nextState === 'empty'
          ? ''
          : nextState === 'withRequired'
            ? stringify({
                parsedQuery: {
                  required_number: 1,
                  required_string: 'rrr',
                  required_string_array: ['1'],
                },
              })
            : stringify({
                parsedQuery: {
                  required_number: 1,
                  optional_number: 2,
                  required_string: 'rrr',
                  optional_string: 'ooo',
                  required_string_array: ['1'],
                  optional_string_array: ['a', 'b', 'a,b,c'],
                },
              }),
    })
    setQueryStringState(nextState)
  }

  return (
    <div className={'tw-py-8'}>
      <div>
        <button type={'button'} onClick={handleToggleQuery}>
          {'toggle query'}
        </button>
      </div>
      <pre className={'tw-mt-4  tw-bg-neutral-200 tw-p-4'}>
        {JSON.stringify(parsedQuery, null, 2)}
      </pre>
      {stringified && (
        <>
          <pre className={'tw-mt-4 tw-bg-neutral-200 tw-p-4'}>
            {stringified.split('&').join('\n')}
          </pre>
          <pre className={'tw-mt-4 tw-bg-neutral-200 tw-p-4'}>
            {stringified}
          </pre>
        </>
      )}
    </div>
  )
}
