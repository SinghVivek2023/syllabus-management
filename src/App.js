import { useState } from 'react';
import ColorModeSwitcher from './ColorModeSwitcher';
import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Select,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Box,
  Button,
  FormControl,
  FormLabel,
  VStack
} from '@chakra-ui/react';
import Footer from './footer'
import {
  FaCalendarAlt, FaBook, FaFolder
} from 'react-icons/fa';
import { ChakraProvider } from '@chakra-ui/react'
import { Link } from "react-router-dom";


function SplitWithImage() {
  const initialSubjects = {
    physics: [
      {
        name: "Mechanics",
        topics: ["Newton's Laws", "Work and Energy", "Rotational Motion"],
      },
      {
        name: "Thermodynamics",
        topics: ["Laws of Thermodynamics", "Heat Engines", "Entropy"],
      },
    ],
    chemistry: [
      {
        name: "Organic Chemistry",
        topics: ["Hydrocarbons", "Alcohols", "Ethers"],
      },
      {
        name: "Inorganic Chemistry",
        topics: ["Acids and Bases", "Metals and Non-Metals", "Periodic Table"],
      },
    ],
    maths: [
      {
        name: "Algebra",
        topics: ["Linear Equations", "Quadratic Equations", "Matrices"],
      },
      {
        name: "Calculus",
        topics: ["Limits and Continuity", "Differentiation", "Integration"],
      },
    ],
  };
  const [standard, setStandard] = useState("");
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");
  const [subjects, setSubjects] = useState(initialSubjects);
  const [editingChapter, setEditingChapter] = useState(null);

  const handleStandardChange = (event) => {
    setStandard(event.target.value);
    setSubject("");
    setChapter("");
    setEditingChapter(null);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
    setChapter("");
    setEditingChapter(null);
  };

  const handleChapterChange = (event) => {
    setChapter(event.target.value);
    setEditingChapter(null);
  };

  const handleAddChapter = () => {
    setEditingChapter({ subject, chapter: { name: "", topics: [] } });
  };

  const handleEditChapter = (chapter) => {
    setEditingChapter({ subject, chapter });
  };

  const handleDeleteChapter = (chapter) => {
    const updatedSubjects = { ...subjects };
    const chapterIndex = updatedSubjects[subject].findIndex((c) => c.name === chapter.name);
    updatedSubjects[subject].splice(chapterIndex, 1);
    setSubjects(updatedSubjects);
    setChapter("");
  };

  const handleSaveChapter = () => {
    const updatedSubjects = { ...subjects };
    if (editingChapter.chapter.name) {
      if (editingChapter.subject === subject) {
        const chapterIndex = updatedSubjects[subject].findIndex((c) => c.name === editingChapter.chapter.name);
        if (chapterIndex >= 0) {
          updatedSubjects[subject][chapterIndex] = editingChapter.chapter;
        } else {
          updatedSubjects[subject].push(editingChapter.chapter);
        }
      } else {
        updatedSubjects[editingChapter.subject].push(editingChapter.chapter);
      }
    }
    setSubjects(updatedSubjects);
    setEditingChapter(null);
  };

  const handleCancelEdit = () => {
    setEditingChapter(null);
  };

  return (
    <ChakraProvider><ColorModeSwitcher ml={{ base: "auto", xl: "1400px" }} />
      <Container maxW={'5xl'} py={12}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4}>
            <Text
              textTransform={'uppercase'}
              color={'blue.400 !important'}
              fontWeight={600}
              fontSize={'sm'}
              bg={useColorModeValue('blue.50', 'blue.900')}
              p={2}
              alignSelf={'flex-start'}
              rounded={'md'}>
              Syllabus management
            </Text>
            <Heading>A digital Provisions</Heading>
            <Text color={'gray.500'} fontSize={'lg'}>
              A syllabus is a document that outlines all the essential information about a course. It lists the topics you will study, as well as the due dates of any coursework including tests, quizzes, or exams. Your professors will give you a syllabus for each of your classes.</Text>
            <Stack
              spacing={4}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.100', 'gray.700')}
                />
              }>

              <Select placeholder="Select Standard" color={"black"} value={standard} onChange={handleStandardChange} icon={<Icon as={FaCalendarAlt} color={'yellow.500 !important'} w={5} h={5} />}
                style={{
                  width: "480px",
                  height: "40px",
                  borderRadius: "8px",
                  padding: "0 10px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  border: "2px solid yellow",
                  backgroundColor: "white",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <option value="1">1st</option>
                <option value="2">2nd</option>
                <option value="3">3rd</option>
                <option value="4">4th</option>
                <option value="5">5th</option>
                <option value="6">6th</option>
                <option value="7">7th</option>
                <option value="8">8th</option>
                <option value="9">9th</option>
                <option value="10">10th</option>
              </Select>
              {standard && (
                <Select placeholder="Select subject" color={'black'} onChange={handleSubjectChange}
                  icon={<Icon as={FaBook} color={'green.500 !important'} w={5} h={5} />}
                  style={{
                    width: "480px",
                    height: "40px",
                    borderRadius: "8px",
                    padding: "0 10px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    border: "2px solid green",
                    backgroundColor: "white",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <option value="physics">Physics</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="maths">Maths</option>
                </Select>
              )}
              {subject && (
                <>
                  <Select placeholder="Select chapter" color={'black'} value={chapter} onChange={handleChapterChange} icon={
                    <Icon as={FaFolder} color={'purple.500 !important'} w={5} h={5} />
                  }
                    style={{
                      width: "480px",
                      height: "40px",
                      borderRadius: "8px",
                      padding: "0 10px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      border: "2px solid purple",
                      backgroundColor: "white",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    }}
                    text={'Chapter'}>
                    {subjects[subject].map((ch) => (
                      <option key={ch.name} value={ch.name}>
                        {ch.name}
                      </option>
                    ))}
                  </Select>
                  <Box>
                    <Button colorScheme="blue" onClick={handleAddChapter} mb={4}>
                      Add chapter
                    </Button>
                  </Box>
                </>
              )}
              {editingChapter && (
                <Box>
                  <FormControl id="chapterName">
                    <FormLabel>Chapter Name</FormLabel>
                    <input
                      type="text"
                      value={editingChapter.chapter.name}
                      onChange={(event) =>
                        setEditingChapter({
                          ...editingChapter,
                          chapter: { ...editingChapter.chapter, name: event.target.value },
                        })
                      }
                    />
                  </FormControl>
                  <Box>
                    <Button colorScheme="blue" onClick={handleSaveChapter} mr={4}>
                      Save
                    </Button>
                    <Button onClick={handleCancelEdit}>Cancel</Button>
                  </Box>
                </Box>
              )}

              {chapter && (
                <Box>
                  <Text fontWeight="bold" mb={2}>
                    Topics:
                  </Text>
                  <VStack alignItems="flex-start">
                    {subjects[subject].find((ch) => ch.name === chapter).topics.map((topic) => (
                      <Link key={topic} to={`/topics/${topic}`}>
                        <Text>{topic}</Text>
                      </Link>
                    ))}
                  </VStack>
                  <Button colorScheme="blue" onClick={() => handleEditChapter(subjects[subject].find((ch) => ch.name === chapter))}>
                    Edit chapter
                  </Button>
                  <Button colorScheme="red" onClick={() => handleDeleteChapter(subjects[subject].find((ch) => ch.name === chapter))}>
                    Delete chapter
                  </Button>
                </Box>
              )}
            </Stack>
          </Stack>
          <Flex>
            <Image
              rounded={'md'}
              alt={'feature image'}
              src={
                'https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
              }
              objectFit={'cover'}
            />
          </Flex>
        </SimpleGrid>
      </Container>
      <Footer />
    </ChakraProvider >
  );
}

export default SplitWithImage;