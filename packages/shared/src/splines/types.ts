import { Points } from '../points'

export type SplineSolver = (x: number) => number
export type SplineSolverFactory = (points: Points) => SplineSolver
