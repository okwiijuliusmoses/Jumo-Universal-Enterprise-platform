import { JumoRepositoryWorkspace } from './JumoRepositoryWorkspace';

export class JumoRepositoryVersionEngine {
  constructor(
    private readonly workspace: JumoRepositoryWorkspace
  ) {}

  latest(repositoryId: string): string {
    const commits = this.workspace
      .listCommits(repositoryId)
      .sort(
        (a, b) =>
          a.createdAt.localeCompare(b.createdAt)
      );

    if (commits.length === 0) {
      return '0.0.0';
    }

    const match =
      commits[commits.length - 1].message.match(
        /v(\d+\.\d+\.\d+)/
      );

    return match?.[1] ?? '0.1.0';
  }

  next(
    current: string,
    level: 'major' | 'minor' | 'patch' = 'patch'
  ): string {
    const parts = current
      .split('.')
      .map(Number);

    if (
      parts.length !== 3 ||
      parts.some(Number.isNaN)
    ) {
      throw new Error(
        `Invalid semantic version: ${current}`
      );
    }

    let [major, minor, patch] = parts;

    if (level === 'major') {
      major += 1;
      minor = 0;
      patch = 0;
    } else if (level === 'minor') {
      minor += 1;
      patch = 0;
    } else {
      patch += 1;
    }

    return `${major}.${minor}.${patch}`;
  }
}
