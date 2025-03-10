import { describe, test } from 'vitest';
import { createDsCoverageDevtool } from './createDsCoverageDevtool';

// TODO: check all the extension-side features
// TODO: check all the UI features
// TODO: check all the notes written during the figma prototype preparation
// TODO: check all the early notes with Matte in the journal

// ----------
// TODO: to be moved to the dsCoverageDebugger module

type CreateDsCoverageDebuggerOptions = {
  getInitialDomain: () => string;
  getStoredConfiguration: () => void;
  updateStoredConfiguration: () => void;
};
type CreateDsCoverageDebuggerReturn = {
  // The debugger needs to know when the domain changes
  onDomainChange: (domain: string) => void;

  // The function that is called by the DS coverage when it's parsing the DOM, and should return the component size, type, weight, etc.
  getComponentInfo: () => void;
};

// type Event

function createDsCoverageDebugger(options: CreateDsCoverageDebuggerOptions) {
  function onDomainChange() {
    // TODO: update the internal domain
    // TODO: update the configuration if empty
  }

  function updateNotifier() {}

  return {
    updateNotifier,
    onDomainChange,
  };
}
// ----------

describe('createDsCoverageDevtool', () => {
  test(`TempTest`, () => {});
  describe.todo(`When created`, () => {
    test(`it's in idle state`, () => {
      // Arrange
      const onUpdateMock = vi.fn();
      const dsCoverageDevtool = createDsCoverageDevtool({ onUpdate: onUpdateMock });
      const { getState } = dsCoverageDevtool;

      // Assert
      const expectedResult: ReturnType<typeof getState> = {
        context: {},
        value: 'idle',
      };

      expect(onUpdateMock).not.toHaveBeenCalled();
      expect(getState()).toEqual(expectedResult);
    });

    test(`then it sends an event with the current state`, () => {
      // Arrange
      const onUpdateMock = vi.fn();
      const dsCoverageDevtool = createDsCoverageDevtool({ onUpdate: onUpdateMock });
      const { getState, start } = dsCoverageDevtool;

      // Act
      start();

      // Assert
      const expectedResult: ReturnType<typeof getState> = {
        context: {},
        value: 'start',
      };

      expect(onUpdateMock).toHaveBeenCalledOnce();
      expect(getState()).toEqual(expectedResult);
    });

    // THESE ARE UI STATES, not debugger states
    // the debugger must read the configuration, not just the global functions.
    // the fact that the UI presents the settings page is a UI only thing
    // describe.todo(`and all the global DS coverage functions are stored locally`, () => {
    //   test.todo(`then it sets the previous the global DS coverage functions`)

    //   test.todo(`then it sends an event containing the global DS coverage functions`)

    //   test.todo(`then it's ready to start debugging`)

    //   test.todo(`then it sends an event with the current state`)
    // })

    // describe.todo(`and some of the global DS coverage functions are stored locally`, () => {
    //   test.todo(`then it sets the previous the global DS coverage functions`)

    //   test.todo(`then it sends an event containing the global DS coverage functions`)

    //   test.todo(`then it waits for the configuration`)

    //   test.todo(`then it sends an event with the current state`)
    // })

    describe.todo(`and the global DS coverage functions are not stored locally`, () => {
      describe.todo(`and the domain is one of the Preply ones`, () => {
        test.todo(`then it sets the global Preply DS coverage functions`);

        test.todo(`then it sends an event containing the global DS coverage functions`);

        test.todo(`then it's ready to start debugging`);

        test.todo(`then it sends an event with the current state`);
      });
      describe.todo(`and the domain is one of the WorkWave ones`, () => {
        test.todo(`then it sets the global WorkWave DS coverage functions`);

        test.todo(`then it sends an event containing the global DS coverage functions`);

        test.todo(`then it's ready to start debugging`);
      });
      describe.todo(`and the domain is not part of the pre-configured ones`, () => {
        test.todo(`then it waits for the global DS coverage functions`);

        test.todo(`then it sends an event with the current state`);
      });
    });

    // useful when the user opens the settings to check the current configuration, maybe after tey get an error after running the coverage
    describe(`and asked to check the global DS coverage functions`, () => {
      describe(`and the passed getComponentInfo doesn't work as expected`, () => {
        test.todo(`then it gets a full list of the errors`);
      });

      describe(`and the passed getCoverageContainerInfo doesn't work as expected`, () => {
        test.todo(`then it gets a full list of the errors`);
      });

      describe(`and the passed getCoverageContainers doesn't work as expected`, () => {
        test.todo(`then it gets a full list of the errors`);
      });

      describe(`and the configuration works as expected`, () => {
        test.todo(`then it gets a confirmation`);
      });

      // Isn't a result -> company-specific result converter missing?
    });

    describe(`and configured`, () => {
      test.todo(`then it immediately calls updateStoredConfiguration`);

      test.todo(`then it immediately calls getCoverageContainers`);

      test.todo(`then it sends the current list of coverage containers`);

      test.todo(`then it sends an event with the current state`);

      describe(`and asked to get the coverage containers list`, () => {
        test.todo(`then it immediately calls getCoverageContainers`);

        test.todo(`then it sends the current list of coverage containers`);

        test.todo(`then it gets the last getCoverageContainers returned`);

        test.todo(`then it sends an event with the current state`);

        describe(`and some coverage containers have the same attribute value`, () => {
          // TODO: error
        });
      });

      describe(`and it's asked to refresh the coverage containers list`, () => {
        describe(`and some coverage containers are missing`, () => {
          test.todo(`then it immediately calls getCoverageContainers`);

          test.todo(`then it gets all the current and previous containers`);

          test.todo(`then the missing containers are marked as not available`);

          test.todo(`then it sends an event with the current state`);
        });

        describe(`and some new coverage containers are available`, () => {
          test.todo(`then it immediately calls getCoverageContainers`);

          test.todo(`then it gets all the current and previous containers`);

          test.todo(`then the new containers are marked as new`);

          test.todo(`then it sends an event with the current state`);
        });
      });
    });

    describe(`and a full debugger configuration is available`, () => {
      // Configuration includes the slowmo timeout, etc.
      // TODO:

      describe(`and it's asked to launch the DS coverage on a specific coverage container`, () => {
        describe(`and the DS coverage doesn't encounter errors`, () => {
          test.todo(`then it launches the DS coverage on the coverage container`);

          test.todo(`then it forwards all the events coming from the DS coverage`);

          test.todo(`then it sends an event with the results`);
        });

        describe(`and the DS coverage encounters errors`, () => {
          test.todo(`then it sends an event with the errors`);
        });

        describe(`and it's asked to stop the DS coverage`, () => {
          test.todo(`then it launches the DS coverage on the coverage container`);

          test.todo(`then it stops the DS coverage`);

          describe(`and it's asked to stop the DS coverage`, () => {
            test.todo(`then it launches the DS coverage on the coverage container again`);

            test.todo(`then it forwards all the events coming from the DS coverage`);

            test.todo(`then it sends an event with the results`);

            test.todo(`then it didn't send any extra event from the stopped DS coverage`);
          });
        });
      });

      describe(`and it's disposed`, () => {
        test.todo(`then it launches the DS coverage on the coverage container`);

        test.todo(`then it stops the DS coverage`);

        describe(`and it's asked to stop the DS coverage`, () => {
          test.todo(`then it launches the DS coverage on the coverage container again`);

          test.todo(`then it forwards all the events coming from the DS coverage`);

          test.todo(`then it sends an event with the results`);

          test.todo(`then it didn't send any extra event from the stopped DS coverage`);
        });
      });
    });

    describe(`and it's asked to launch the DS coverage on the HTML body`, () => {
      describe(`and the DS coverage doesn't encounter errors`, () => {
        test.todo(`then it launches the DS coverage on the HTML body`);

        test.todo(`then it forwards all the events coming from the DS coverage`);

        // Sending the bitmap should de a dedicated option, it should not be sent by default
        test.todo(`then it sends an event with the results`);
      });
    });

    describe(`and it's asked to launch the DS coverage on all the containers`, () => {
      test.todo(`then it launches the DS coverage on all the coverage containers`);

      test.todo(`then it forwards all the events coming from the DS coverage`);

      // Sending the bitmap should de a dedicated option, it should not be sent by default
      test.todo(`then it sends an event with the results`);
    });

    describe(`and it's asked to launch the DS coverage step by step with only the "find containers" option enabled`, () => {
      test.todo(`then it launches the DS coverage on all the coverage containers`);

      test.todo(`then it sends an event containing the first coverage container data`);

      test.todo(`then it draws an SVG in page`);

      test.todo(`then it pauses`);

      describe(`and it's resumed`, () => {
        test.todo(`then it sends an event containing the seconds coverage container data`);

        // Drawing SVGs should have a dedicated option
        test.todo(`then it draws an SVG in page`);

        test.todo(`then it pauses`);

        describe(`and it's resumed`, () => {
          test.todo(`then it sends an event containing the third coverage container data`);

          test.todo(`then it draws an SVG in page`);

          test.todo(`then it pauses`);

          describe(`and it's resumed`, () => {
            test.todo(`then it run the DS coverage up to completion`);

            // Sending the bitmap should de a dedicated option, it should not be sent by default
            test.todo(`then it sends an event with the results, including the bitmap`);
          });
        });
      });
    });

    describe(`and it's asked to launch the DS coverage step by step with only the "get element size" option enabled`, () => {
      test.todo(`then it launches the DS coverage on all the coverage containers`);

      test.todo(
        `then it sends an event containing the first element data, including the first coverage container data`,
      );

      test.todo(`then it draws an SVG in page`);

      test.todo(`then it pauses`);

      describe(`and it's resumed`, () => {
        test.todo(
          `then it sends an event containing the second element data, including the first coverage container data`,
        );

        test.todo(`then it draws an SVG in page`);

        test.todo(`then it pauses`);

        describe(`and it's resumed`, () => {
          test.todo(
            `then it sends an event containing the third element data, including the first coverage container data`,
          );

          test.todo(`then it draws an SVG in page`);

          test.todo(`then it pauses`);

          describe(`and it's resumed`, () => {
            test.todo(
              `then it sends an event containing the first element data, including the second coverage container data`,
            );

            test.todo(`then it draws an SVG in page`);

            test.todo(`then it pauses`);

            describe(`and it's resumed`, () => {
              test.todo(
                `then it sends an event containing the second element data, including the second coverage container data`,
              );

              test.todo(`then it draws an SVG in page`);

              test.todo(`then it pauses`);

              describe(`and it's resumed`, () => {
                test.todo(
                  `then it sends an event containing the third element data, including the second coverage container data`,
                );

                test.todo(`then it draws an SVG in page`);

                test.todo(`then it pauses`);

                describe(`and it's resumed`, () => {
                  test.todo(`then it run the DS coverage up to completion`);

                  // Sending the bitmap should de a dedicated option, it should not be sent by default
                  test.todo(`then it sends an event with the results, including the bitmap`);
                });
              });
            });
          });
        });
      });
    });

    // TODO: it should allow to remove or to keep the previous SVGs
    // TODO: it should remove all the previous SVGs when relaunched
    describe(`and it's asked to launch the DS coverage step by step with the "get element size" and "bitmap preview" options enabled`, () => {
      test.todo(`then it launches the DS coverage on all the coverage containers`);

      test.todo(
        `then it sends an event containing the first element data, including the first coverage container data, and the bitmap`,
      );

      test.todo(`then it draws an SVG in page`);

      test.todo(`then it pauses`);

      describe(`and it's resumed`, () => {
        test.todo(
          `then it sends an event containing the second element data, including the first coverage container data, and the bitmap`,
        );

        test.todo(`then it draws an SVG in page`);

        test.todo(`then it pauses`);

        describe(`and it's resumed`, () => {
          test.todo(
            `then it sends an event containing the third element data, including the first coverage container data, and the bitmap`,
          );

          test.todo(`then it draws an SVG in page`);

          test.todo(`then it pauses`);

          describe(`and it's resumed`, () => {
            test.todo(
              `then it sends an event containing the first element data, including the second coverage container data, and the bitmap`,
            );

            test.todo(`then it draws an SVG in page`);

            test.todo(`then it pauses`);

            describe(`and it's resumed`, () => {
              test.todo(
                `then it sends an event containing the second element data, including the second coverage container data, and the bitmap`,
              );

              test.todo(`then it draws an SVG in page`);

              test.todo(`then it pauses`);

              describe(`and it's resumed`, () => {
                test.todo(
                  `then it sends an event containing the third element data, including the second coverage container data, and the bitmap`,
                );

                test.todo(`then it draws an SVG in page`);

                test.todo(`then it pauses`);

                describe(`and it's resumed`, () => {
                  test.todo(`then it run the DS coverage up to completion`);

                  // Sending the bitmap should de a dedicated option, it should not be sent by default
                  test.todo(`then it sends an event with the results, including the bitmap`);
                });
              });
            });
          });
        });
      });
    });
  });
});
