import { FormControl,
    Input,
    Textarea,
    Select,
    Box,
    VStack,
    Button,
    Heading, } from "@chakra-ui/react"

const SubmitPost = () => {
  return (
    <Box maxW='container.md' m='auto' p='2em'>
        
    <form>
        <VStack gap='1em'>
            <Heading size='md' alignSelf='flex-start'>Create a Post</Heading>
        <Select placeholder='Select Community' bg='white' maxW='14em' alignSelf='flex-start'>
  <option value='option1'>Option 1</option>
  <option value='option2'>Option 2</option>
  <option value='option3'>Option 3</option>
</Select>
    <FormControl>
        <Input placeholder="Title" bg='white' borderRadius={5}/>
    </FormControl>
    <FormControl>
    <Textarea
        placeholder='Description(optional)'
        size='sm'
        resize='vertical'
        bg='white'
        borderRadius={5}
      />
    </FormControl>
    <Button
    fontSize="1rem"
    bg="brand.100"
    color="white"
    fontWeight="normal"
    borderRadius={5}
    alignSelf='flex-end'
  >
    Post
  </Button>
    </VStack>
    </form>
    </Box>
  )
}

export default SubmitPost