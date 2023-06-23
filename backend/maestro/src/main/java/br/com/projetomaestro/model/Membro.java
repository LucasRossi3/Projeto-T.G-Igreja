package br.com.projetomaestro.model;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "tb_membro")
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Membro {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long codigo;
	
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "pessoaCodigo")
	private Pessoa pessoa;
	
}
