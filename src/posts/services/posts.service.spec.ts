import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { PostsRepository } from '../repositories/posts.repository';
import { IPosts } from '../schemas/models/posts.interface';
import { CreatePostDto } from '../dto/create-post.dto';

describe('PostsService', () => {
  let service: PostsService;
  let repository: PostsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: PostsRepository,
          useValue: {
            getAllPosts: jest.fn(),
            getPostById: jest.fn(),
            createPost: jest.fn(),
            deletePostById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    repository = module.get<PostsRepository>(PostsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllPosts', () => {
    it('should return an array of posts', async () => {
      const result: IPosts[] = [{ title: 'Test Post', description: 'Test Description', author: 'Test Author', created_at: new Date() }];
      jest.spyOn(repository, 'getAllPosts').mockResolvedValue(result);

      expect(await service.getAllPosts(10, 1)).toBe(result);
    });
  });

  describe('getPostById', () => {
    it('should return a single post', async () => {
      const id = 'some-id';
      const result: IPosts = { title: 'Test Post', description: 'Test Description', author: 'Test Author', created_at: new Date() };
      jest.spyOn(repository, 'getPostById').mockResolvedValue(result);

      expect(await service.getPostById(id)).toBe(result);
    });
  });

  describe('createPost', () => {
    it('should create and return a post', async () => {
      const createPostDto: CreatePostDto = { title: 'New Post', description: 'New Description', author: 'New Author' };
      const result: IPosts = { ...createPostDto, created_at: new Date() };
      jest.spyOn(repository, 'createPost').mockResolvedValue(result);

      expect(await service.createPost(createPostDto)).toBe(result);
      expect(repository.createPost).toHaveBeenCalledWith(expect.objectContaining({
        title: createPostDto.title,
        description: createPostDto.description,
        author: createPostDto.author,
      }));
    });
  });

  describe('updatePostById', () => {
    it('should update and return the post', async () => {
      const updatePostDto = { id: 'some-id', title: 'Updated Title', description: 'Updated Description', author: 'Updated Author' };
      const existingPost: IPosts = { title: 'Original Title', description: 'Original Description', author: 'Original Author', created_at: new Date() };
      const updatedPost = { ...existingPost, ...updatePostDto }; // Include all properties, including created_at
  
      jest.spyOn(repository, 'getPostById').mockResolvedValue(existingPost);
      jest.spyOn(repository, 'createPost').mockResolvedValue(updatedPost);
  
      const result = await service.updatePostById(updatePostDto);
      expect(result).toEqual(updatedPost);
      expect(repository.createPost).toHaveBeenCalledWith(expect.objectContaining({
        title: updatePostDto.title,
        description: updatePostDto.description,
        author: updatePostDto.author,
        created_at: existingPost.created_at, // Ensure created_at is included in the expectation
      }));
    });
  });
  
 
  
  describe('deletePostById', () => {
    it('should delete and return the post', async () => {
      const id = 'some-id';
      const result: IPosts = { title: 'Deleted Post', description: 'Deleted Description', author: 'Deleted Author', created_at: new Date() };

      jest.spyOn(repository, 'deletePostById').mockResolvedValue(result);

      expect(await service.deletePostById(id)).toBe(result);
      expect(repository.deletePostById).toHaveBeenCalledWith(id);
    });
  });
});
