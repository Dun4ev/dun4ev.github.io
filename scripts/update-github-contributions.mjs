import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const token = process.env.GITHUB_TOKEN;
const username = process.env.GITHUB_USERNAME || 'Dun4ev';
const outputPath = process.env.GITHUB_CONTRIBUTIONS_OUTPUT || 'public/data/github-contributions.json';

if (!token) {
  throw new Error('GITHUB_TOKEN is required to update GitHub contributions.');
}

const to = new Date();
const from = new Date(to);
from.setUTCFullYear(from.getUTCFullYear() - 1);

const query = `
  query ContributionCalendar($userName: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $userName) {
      login
      name
      url
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          colors
          weeks {
            firstDay
            contributionDays {
              color
              contributionCount
              date
              weekday
            }
          }
        }
      }
    }
  }
`;

const response = await fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query,
    variables: {
      userName: username,
      from: from.toISOString(),
      to: to.toISOString(),
    },
  }),
});

const payload = await response.json();

if (!response.ok || payload.errors) {
  throw new Error(JSON.stringify(payload.errors || payload, null, 2));
}

const user = payload.data?.user;

if (!user) {
  throw new Error(`GitHub user not found: ${username}`);
}

const calendar = user.contributionsCollection.contributionCalendar;
const result = {
  username: user.login,
  name: user.name,
  url: user.url,
  generatedAt: new Date().toISOString(),
  totalContributions: calendar.totalContributions,
  colors: calendar.colors,
  weeks: calendar.weeks,
};

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, 'utf8');

console.log(`Updated ${outputPath} for ${user.login}: ${calendar.totalContributions} contributions.`);
