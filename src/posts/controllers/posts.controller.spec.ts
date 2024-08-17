import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from '../services/posts.service';
import { PostsProvider } from '../provider/posts.provider';
import { CreatePostDto } from '../dto/create-post.dto';
import { IPosts } from '../schemas/models/posts.interface';

describe('PostsController', () => {
  let controller: PostsController;
  let postsService: PostsService;
  let postsProvider: PostsProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: {
            getAllPosts: jest.fn(),
            getPostById: jest.fn(),
            createPost: jest.fn(),
            updatePostById: jest.fn(),
            deletePostById: jest.fn(),
            search: jest.fn(),
            getPostsAdmin: jest.fn(),
          },
        },
        {
          provide: PostsProvider,
          useValue: {
            checkUserRole: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    postsService = module.get<PostsService>(PostsService);
    postsProvider = module.get<PostsProvider>(PostsProvider);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllPosts', () => {
    it('should return an array of posts', async () => {
      const result: IPosts[] = [{ title: 'Test Post', description: 'Test Description', author: 'Test Author', created_at: new Date() }];
      jest.spyOn(postsService, 'getAllPosts').mockResolvedValue(result);

      expect(await controller.getAllPosts(10, 1)).toBe(result);
    });
  });

  describe('getPostsBySearch', () => {
    it('should return an array of posts', async () => {
      const query = 'Test';
      const result: IPosts[] = [{ title: 'Test Post', description: 'Test Description', author: 'Test Author', created_at: new Date() }];
      jest.spyOn(postsService, 'search').mockResolvedValue(result);

      expect(await controller.getPostsBySearch(query)).toBe(result);
    });
  });

  describe('getPostsAdmin', () => {
    it('should return an array of posts', async () => {
      const result: IPosts[] = [{ id: 'some-id', title: 'Test Post', description: 'Test Description', author: 'Test Author', created_at: new Date() }];
      jest.spyOn(postsProvider, 'checkUserRole').mockResolvedValue('teacher');
      jest.spyOn(postsService, 'getPostsAdmin').mockResolvedValue(result);
      expect(await controller.getPostsAdmin('some-id')).toEqual(result);
    });

    it('should return "Você não tem permissão para criar postagens." if user does not have permission', async () => {
      jest.spyOn(postsProvider, 'checkUserRole').mockResolvedValue('student');
    
      const result = 'Você não tem permissão para acessar postagens.';
    
      expect(await controller.getPostsAdmin('some-id')).toBe(result);
    } );
  });

  describe('getOnePost', () => {
    it('should return a single post', async () => {
      const result: IPosts = { title: 'Test Post', description: 'Test Description', author: 'Test Author', created_at: new Date() };
      jest.spyOn(postsService, 'getPostById').mockResolvedValue(result);

      expect(await controller.getOnePost('some-id')).toBe(result);
    });

    it('should return "Post não encontrado." if post is not found', async () => {
      jest.spyOn(postsService, 'getPostById').mockResolvedValue(null);

      expect(await controller.getOnePost('some-id')).toBe('Post não encontrado.');
    });
  });

  describe('createPost', () => {
    it('should create and return the post if user is a teacher', async () => {
      const createPostDto: CreatePostDto & { user_id: string } = { title: 'New Post', description: 'New Description', author: 'New Author', user_id: 'user-id' };
      const result: IPosts = { ...createPostDto, created_at: new Date() };
      jest.spyOn(postsProvider, 'checkUserRole').mockResolvedValue('teacher');
      jest.spyOn(postsService, 'createPost').mockResolvedValue(result);

      expect(await controller.createPost(createPostDto)).toEqual({
        title: result.title,
        description: result.description,
        autor: result.author,
      });
    });

    it('should return "Você não tem permissão para criar postagens." if user is not a teacher', async () => {
      jest.spyOn(postsProvider, 'checkUserRole').mockResolvedValue('student');

      expect(await controller.createPost({ title: 'New Post', description: 'New Description', author: 'New Author', user_id: 'user-id' })).toBe('Você não tem permissão para criar postagens.');
    });
  });

  describe('updatePost', () => {
    it('should update and return the post if user is a teacher', async () => {
      const updatePostDto: CreatePostDto & { user_id: string } = { title: 'Updated Post', description: 'Updated Description', author: 'Updated Author', user_id: 'user-id' };
      const result: IPosts = { ...updatePostDto, created_at: new Date() };
      jest.spyOn(postsProvider, 'checkUserRole').mockResolvedValue('teacher');
      jest.spyOn(postsService, 'updatePostById').mockResolvedValue(result);

      expect(await controller.updatePost('some-id', updatePostDto)).toBe(result);
    });

    it('should return "Você não tem permissão para atualizar postagens." if user is not a teacher', async () => {
      jest.spyOn(postsProvider, 'checkUserRole').mockResolvedValue('student');

      expect(await controller.updatePost('some-id', { title: 'Updated Post', description: 'Updated Description', author: 'Updated Author', user_id: 'user-id' })).toBe('Você não tem permissão para atualizar postagens.');
    });
  });

  describe('deletePostById', () => {
    it('should delete and return success message if user is a teacher', async () => {
      const result: IPosts = { title: 'Deleted Post', description: 'Deleted Description', author: 'Deleted Author', created_at: new Date() };
      jest.spyOn(postsProvider, 'checkUserRole').mockResolvedValue('teacher');
      jest.spyOn(postsService, 'deletePostById').mockResolvedValue(result);

      expect(await controller.deletePostById('some-id', { user_id: 'user-id' })).toBe(`Post ${result.title} deletado com sucesso.`);
    });

    it('should return "Você não tem permissão para deletar postagens." if user is not a teacher', async () => {
      jest.spyOn(postsProvider, 'checkUserRole').mockResolvedValue('student');

      expect(await controller.deletePostById('some-id', { user_id: 'user-id' })).toBe('Você não tem permissão para deletar postagens.');
    });

    it('should return "Post não encontrado." if post is not found', async () => {
      jest.spyOn(postsProvider, 'checkUserRole').mockResolvedValue('teacher');
      jest.spyOn(postsService, 'deletePostById').mockResolvedValue(null);

      expect(await controller.deletePostById('some-id', { user_id: 'user-id' })).toBe('Post não encontrado.');
    });
  });
});
