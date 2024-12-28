import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({ status: 201, description: 'Role created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createRoleDto: CreateRoleDto, @Request() req) {
    const userId = req.user.userId?.userId;
    console.log('hellosfddf', userId, createRoleDto)
    return this.rolesService.create(createRoleDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, description: 'Roles retrieved successfully.' })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':roleId')
  @ApiOperation({ summary: 'Get role by ID' })
  @ApiResponse({ status: 200, description: 'Role retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
  findOne(@Param('roleId') roleId: string) {
    return this.rolesService.findOne(roleId);
  }

  @Patch(':roleId')
  @ApiOperation({ summary: 'Update a role' })
  @ApiResponse({ status: 200, description: 'Role updated successfully.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
  update(@Param('roleId') roleId: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(roleId, updateRoleDto);
  }

  @Delete(':roleId')
  @ApiOperation({ summary: 'Delete a role' })
  @ApiResponse({ status: 200, description: 'Role deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
  remove(@Param('roleId') roleId: string) {
    return this.rolesService.remove(roleId);
  }
}
