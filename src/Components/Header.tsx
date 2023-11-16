import { ActionIcon, Group, Text, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import classes from './Header.module.css';
import { IconMoon, IconSun } from '@tabler/icons-react';
import cx from 'clsx';



export function Header() {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    return (
        <header className={classes.header}>
            <div className={classes.inner}>
                <Group>
                    <img width="40" height="40" src="https://img.icons8.com/ultraviolet/40/facial-recognition-scan.png" alt="facial-recognition-scan" />
                    <Text
                        size="lg"
                        fw={900}
                        variant="gradient"
                        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                    >
                        Facialyst
                    </Text>
                </Group>
                <Group>
                    <ActionIcon
                        onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
                        variant="default"
                        size="sm"
                        aria-label="Toggle color scheme"
                    >
                        <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
                        <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </div>
        </header>
    );
}