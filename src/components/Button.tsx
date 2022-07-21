import { Button as NativeButton, IButtonProps, Heading} from 'native-base';

type INativeButtonProps = IButtonProps & {
    title: string;
}

export function Button({ title, ... rest}: INativeButtonProps){
    return (
        <NativeButton
          bg="green.700"
          h={14}
          fontSize="sm"
          rounded="sm"
          _pressed={{ bg:"green_500"}}
          {...rest}
        >
          <Heading color="white" fontSize="sm">
            {title}
          </Heading>
        </NativeButton>
    )
}