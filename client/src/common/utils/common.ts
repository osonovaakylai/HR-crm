export const patch = <T>(target: T, json: Partial<T>) => {
  for (const property in json) {
    if (json.hasOwnProperty(property)) {
      (target as any)[property] = (json as any)[property]
    }
  }
}

export const daysBetween = (dateStart: any, dateEnd: any) => {
  const dateStartMS = getMilliseconds(dateStart)
  const dateEndMS = getMilliseconds(dateEnd)
  return Math.round((dateEndMS - dateStartMS) / (1000 * 60 * 60 * 24))
}

const getMilliseconds = (date: any): number => {
  if (typeof date === 'number') {
    return date
  } else if (typeof date === 'string') {
    return new Date(date).getMilliseconds()
  } else if (Object.prototype.toString.call(date) === '[object Date]') {
    return date.getMilliseconds()
  } else if (date.isMoment()) {
    return date.valueOf()
  } else {
    throw Error('Invalid Date Format')
  }
}

export const dasherize = (string: string) => string.replace(/ /g, '-')