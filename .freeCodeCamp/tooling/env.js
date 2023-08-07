import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { logover } from './logger.js';

export const ROOT = process.env.INIT_CWD || process.cwd();

export async function getConfig() {
  const config = await readFile(join(ROOT, 'freecodecamp.conf.json'), 'utf-8');
  const conf = JSON.parse(config);
  const defaultConfig = {
    curriculum: {
      path: 'curriculum',
      locales: {
        english: 'curriculum/locales/english'
      }
    },
    config: {
      'projects.json': 'config/projects.json',
      'state.json': 'config/state.json'
    }
  };
  return { ...defaultConfig, ...conf };
}

export const freeCodeCampConfig = await getConfig();

export async function getState() {
  let defaultState = {
    currentProject: null,
    locale: 'english',
    lastSeed: {
      projectDashedName: null,
      // All lessons start at 0, but the logic for whether to seed a lesson
      // or not is based on the current lesson matching the last seeded lesson
      // So, to ensure the first lesson is seeded, this is -1
      lessonNumber: -1
    }
  };
  try {
    const state = JSON.parse(
      await readFile(
        join(ROOT, freeCodeCampConfig.config['state.json']),
        'utf-8'
      )
    );
    return { ...defaultState, ...state };
  } catch (err) {
    logover.error(err);
  }
  return defaultState;
}

export async function setState(obj) {
  const state = await getState();
  const updatedState = {
    ...state,
    ...obj
  };

  await writeFile(
    join(ROOT, freeCodeCampConfig.config['state.json']),
    JSON.stringify(updatedState, null, 2)
  );
}

/**
 * @param {string} project Project dashed name
 */
export async function getProjectConfig(project) {
  const projects = JSON.parse(
    await readFile(
      join(ROOT, freeCodeCampConfig.config['projects.json']),
      'utf-8'
    )
  );

  const proj = projects.find(p => p.dashedName === project);

  const defaultConfig = {
    testPollingRate: 333,
    currentLesson: 0,
    runTestsOnWatch: false,
    lastKnownLessonWithHash: 0,
    seedEveryLesson: false,
    blockingTests: false,
    breakOnFailure: false,
    useGitBuildOnProduction: false // TODO: Necessary?
  };
  if (!proj) {
    return defaultConfig;
  }
  return { ...defaultConfig, ...proj };
}

/**
 *
 * @param {string} projectDashedName Project dashed name
 * @param {object} config Config properties to set
 */
export async function setProjectConfig(projectDashedName, config = {}) {
  const projects = JSON.parse(
    await readFile(
      join(ROOT, freeCodeCampConfig.config['projects.json']),
      'utf-8'
    )
  );

  const updatedProject = {
    ...projects.find(p => p.dashedName === projectDashedName),
    ...config
  };

  const updatedProjects = projects.map(p =>
    p.dashedName === projectDashedName ? updatedProject : p
  );

  await writeFile(
    join(ROOT, freeCodeCampConfig.config['projects.json']),
    JSON.stringify(updatedProjects, null, 2)
  );
}
