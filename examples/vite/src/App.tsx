import {
    Avatar,
    Icon,
    Badge,
    Box,
    Button,
    NumberField,
    TextField,
    PasswordField,
    Heading,
    Link,
    LayoutFlex,
    LayoutFlexItem,
    SelectField,
    SelectFieldOption,
    Text,
} from '@noriste/ds-web-lib';
import TokyoUIRefresh from '@noriste/ds-media-icons/dist/24/TokyoUIRefresh.svg';
import { initDsVisualCoverage } from './initDsVisualCoverage';
import { useEffect } from 'react';
import { getCoverageContainerAttributes } from '@noriste/ds-visual-coverage-preply-web';

export default function App() {
    useEffect(() => {
        const { cancel, runNow, start } = initDsVisualCoverage();
        start();
        runNow();
        return cancel;
    }, []);

    return (
        <div
            {...getCoverageContainerAttributes({
                component: 'App',
                team: 'design_system',
            })}
        >
            <Box>
                <LayoutFlex direction="column" gap="32" padding="8">
                    <LayoutFlex gap="24" direction="column">
                        <LayoutFlex gap="8" alignItems="center">
                            <Avatar size="32" />
                            <Heading tag="h2" variant="extraLarge">
                                Hello world
                            </Heading>
                            <Badge type="positive">Lorem ipsum</Badge>
                        </LayoutFlex>
                        <Text variant="default-regular">
                            Lorem ipsum dolor sit ametLorem ipsum dolor sit amet, consectetur
                            adipiscing elit. Vestibulum id odio metus. Integer tempus lectus leo,
                            eget scelerisque mi finibus ac. Ultrices est. In scelerisque, sapien
                            vitae vehicula posuere, nulla ante facilisis risus.
                        </Text>
                        <div
                            {...getCoverageContainerAttributes({
                                component: 'Content',
                                team: 'design_system',
                            })}
                        >
                            <span>
                                Lorem ipsum dolor sit ametLorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Vestibulum id odio metus. Integer tempus lectus
                                leo, eget scelerisque mi finibus ac. Ultrices est. In scelerisque,
                                sapien vitae vehicula posuere, nulla ante facilisis risus.
                            </span>
                        </div>
                    </LayoutFlex>
                    <LayoutFlex gap="24" direction="column">
                        <LayoutFlex gap="24">
                            <LayoutFlexItem stretch>
                                <TextField label="Username" required defaultValue="" />
                            </LayoutFlexItem>
                            <LayoutFlexItem stretch>
                                <PasswordField label="Password" required defaultValue="" />
                            </LayoutFlexItem>
                        </LayoutFlex>
                        <LayoutFlex gap="24">
                            <LayoutFlexItem stretch>
                                <NumberField
                                    label="Hourly rate"
                                    required
                                    defaultValue={0}
                                    placeholder="e.g: 12.5"
                                />
                            </LayoutFlexItem>
                            <LayoutFlexItem stretch>
                                <SelectField
                                    label="Currency"
                                    required
                                    defaultValue=""
                                    placeholder="Select one"
                                >
                                    <SelectFieldOption value="usd">USD</SelectFieldOption>
                                    <SelectFieldOption value="eur">EUR</SelectFieldOption>
                                </SelectField>
                            </LayoutFlexItem>
                        </LayoutFlex>
                        <LayoutFlex gap="16" direction="column" alignItems="start">
                            <Button variant="primary">Login</Button>
                            <Link href="#">Forgot my password</Link>
                        </LayoutFlex>
                        <LayoutFlex gap="8" direction="row">
                            <Text variant="small-regular" accent="positive">
                                <Icon svg={TokyoUIRefresh} size="16" />
                                Praesent eu ligula egestas, dignissim justo in.
                            </Text>
                        </LayoutFlex>
                    </LayoutFlex>
                </LayoutFlex>
            </Box>
        </div>
    );
}
