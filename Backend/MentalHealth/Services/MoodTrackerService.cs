﻿using MentalHealth.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace MentalHealth.Services
{
	public class MoodTrackerService : IService<MoodTracker>
	{
		private readonly MentalHealthContext _context;

		public MoodTrackerService(MentalHealthContext context)
		{
			_context = context;
		}

		public async Task Add(MoodTracker entity)
		{
			_context.MoodTracker.Add(entity);
			await _context.SaveChangesAsync();
		}

		public async Task<MoodTracker> Get(long id)
		{
			return await _context.MoodTracker.FindAsync(id);
		}

		public async Task<IEnumerable<MoodTracker>> GetAll()
		{
			return await _context.MoodTracker.ToListAsync();
		}

		public async Task Update(MoodTracker entity)
		{
			throw new NotImplementedException();
		}

		public async Task Delete(long id)
		{
			throw new NotImplementedException();
		}
	}
}
